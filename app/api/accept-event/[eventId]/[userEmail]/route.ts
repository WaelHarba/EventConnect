import { EmailTemplate } from "@/components/ui/email-tempate";
import DatabaseLibrary from "@/lib/classes/database-library";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string; userEmail: string }> }) {
	const { eventId, userEmail } = await params;

	if (!userEmail || !eventId) {
		return new Response(`Something went wrong`, {
			status: 400,
		});
	}

	const dbLibrary = new DatabaseLibrary();
	const result = await dbLibrary.managedQueryExec(
		`UPDATE events SET pending_invitees = array_remove(pending_invitees, '${userEmail}'), accepted_invitees = array_append(COALESCE(accepted_invitees, '{}'), '${userEmail}') WHERE event_id = '${eventId}' RETURNING *`
	);

	const now = new Date();
	// Converting to date object for the email template
	result.rows[0].event_details.date = new Date(result.rows[0].event_details.date);
	const differenceInHours = (result.rows[0].event_details.date.getTime() - now.getTime()) / (1000 * 60 * 60);

	const resend = new Resend(process.env.RESEND_API_KEY);
	if (differenceInHours <= 24) {
		// Send the email immediately if it's the day of the event
		await resend.emails.send({
			from: `EventConnect <${process.env.EMAIL_SENDER}>`,
			to: [userEmail],
			subject: "Don't forget your event today!",
			react: EmailTemplate({ event: result.rows[0].event_details, creatorUsername: result.rows[0].creator_username as string, eventId: result.rows[0].event_id, invitee: userEmail }),
		});
	} else {
		const response = await resend.emails.send({
			from: `EventConnect <${process.env.EMAIL_SENDER}>`,
			to: [userEmail],
			subject: "Don't forget your event!",
			react: EmailTemplate({ event: result.rows[0].event_details, creatorUsername: result.rows[0].creator_username as string, eventId: result.rows[0].event_id, invitee: userEmail }),
			scheduledAt: result.rows[0].event_details.date.toISOString(),
		});
		console.log("Scheduled email response:", response);
	}

	redirect("/event-response");
}
