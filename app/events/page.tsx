import EventManager from "@/components/event-manager";
import DatabaseLibrary from "@/lib/classes/database-library";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/lib/types";

export default async function Events() {
	const dbLibrary = new DatabaseLibrary();
	const user = await currentUser();
	const friends = await dbLibrary.managedQueryExec(`SELECT friend_username, friend_email, friend_pic FROM friendships WHERE username = '${user?.username}' AND status = 'ACCEPTED'`);
	let friendsList: User[] = [];
	friends.rows.forEach((friend) => {
		friendsList.push({
			username: friend.friend_username,
			email: friend.friend_email,
			profilePic: friend.friend_pic,
		});
	});

	return <EventManager friendsList={friendsList} />;
}
