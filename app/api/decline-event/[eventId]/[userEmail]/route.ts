import DatabaseLibrary from "@/lib/classes/database-library";
import { redirect } from "next/navigation";

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string; userEmail: string }> }) {
	const { eventId, userEmail } = await params;

	if (!userEmail || !eventId) {
		return new Response(`Something went wrong`, {
			status: 400,
		});
	}

	const dbLibrary = new DatabaseLibrary();
	await dbLibrary.managedQueryExec(`UPDATE events SET pending_invitees = array_remove(pending_invitees, '${userEmail}') WHERE event_id = '${eventId}'`);

	redirect("/event-response");
}
