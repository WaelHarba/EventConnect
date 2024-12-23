"use server";
import { createClerkClient } from "@clerk/backend";
import { User } from "@/lib/types";
import DatabaseLibrary from "@/lib/classes/database-library";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { BirthdayParty, GamingSession, MovieNight } from "@/lib/interfaces";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/email-tempate";

// This function finds and returns a user from Clerk through username
export async function searchForUser(prevState: any, formData: FormData): Promise<{ message: string; success: boolean; userFound?: User }> {
	const user = await currentUser();
	if (!user || !user.username) {
		redirect("/");
	}

	const usernameToFind = formData.get("username");

	if (!usernameToFind || typeof usernameToFind !== "string" || usernameToFind.length < 4 || usernameToFind.length > 40 || usernameToFind === user.username) {
		return { message: "Please enter a valid username", success: false };
	}

	const dbLibrary = new DatabaseLibrary();
	const queryResponse = await dbLibrary.managedQueryExec(`SELECT * FROM friendships WHERE (username='${user.username}' AND friend_username='${usernameToFind}') OR (username='${usernameToFind}' AND friend_username='${user.username}') `);

	if (queryResponse.rows.length > 0) {
		return { message: "User either is already friends with you or there's an existing friend request between the two of you", success: false };
	}

	const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

	const response = await clerkClient.users.getUserList({
		username: [usernameToFind],
	});

	if (response.totalCount === 0) {
		return { message: "No user found", success: false };
	}

	return { message: "User found: " + response.data[0].username, success: true, userFound: { username: response.data[0].username!, email: response.data[0].emailAddresses[0].emailAddress, profilePic: response.data[0].imageUrl } };
}

export async function respondToFriendRequest(acceptRequest: boolean, senderUsername: string, senderEmail: string, senderPic: string) {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	} else if (typeof senderEmail !== "string" || typeof senderUsername !== "string" || typeof senderPic !== "string" || typeof acceptRequest !== "boolean" || !senderEmail || !senderUsername) {
		redirect("/friends");
	}

	const dbLibrary = new DatabaseLibrary();
	if (acceptRequest) {
		await dbLibrary.managedQueryExec(`UPDATE friendships SET status = 'ACCEPTED' WHERE username = '${senderUsername}' AND friend_username = '${user.username}'`);
		await dbLibrary.managedQueryExec(
			`INSERT INTO friendships(username, email, profile_pic, status, friend_username, friend_email, friend_pic) VALUES('${user.username}', '${user.emailAddresses[0].emailAddress}', '${user.imageUrl}', 'ACCEPTED', '${senderUsername}', '${senderEmail}', '${senderPic}')`
		);
	} else {
		await dbLibrary.managedQueryExec(`DELETE FROM friendships WHERE username = '${senderUsername}' AND friend_username = '${user.username}'`);
	}

	revalidatePath("/friends");
}

export async function sendFriendRequest(friendUsername: string, friendEmail: string, friendPic: string) {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}

	if (typeof friendEmail !== "string" || typeof friendUsername !== "string" || typeof friendPic !== "string" || !friendEmail || !friendPic || !friendUsername) {
		redirect("/friends");
	}

	const dbLibrary = new DatabaseLibrary();
	await dbLibrary.managedQueryExec(
		`INSERT INTO friendships(username, email, profile_pic, status, friend_username, friend_email, friend_pic) VALUES('${user.username}', '${user.emailAddresses[0].emailAddress}', '${user.imageUrl}', 'PENDING', '${friendUsername}', '${friendEmail}', '${friendPic}')`
	);

	revalidatePath("/friends");
}

export async function createEvent(event: BirthdayParty | GamingSession | MovieNight): Promise<{ message: string; success: boolean }> {
	const user = await currentUser();
	if (!user || !user.username) {
		redirect("/");
	}

	if (event.invitees.length <= 0 || !event.date || !event.location || !event.title) {
		return {
			message: "Please fill in all the fields",
			success: false,
		};
	}

	const dbLibrary = new DatabaseLibrary();
	const eventId = await dbLibrary.managedQueryExec(
		`INSERT INTO events(creator_username, event_details, accepted_invitees, pending_invitees) VALUES('${user.username}', '${JSON.stringify(event)}', '{${[user.emailAddresses[0].emailAddress]}}', '{${[event.invitees]}}') RETURNING event_id`
	);

	const resend = new Resend(process.env.RESEND_API_KEY);

	event.invitees.forEach(async (invitee) => {
		const response = await resend.emails.send({
			from: `EventConnect <${process.env.EMAIL_SENDER}>`,
			to: invitee,
			subject: "You're invited to " + event.title,
			react: EmailTemplate({ event: event, creatorUsername: user.username as string, eventId: eventId.rows[0].event_id, invitee }),
		});

		if (response.error) {
			return {
				message: "Something went wrong creating the event",
				success: false,
			};
		}
	});

	return {
		message: "Invitees have been told about the event! Have fun!",
		success: true,
	};
}
