import { BirthdayParty, GamingSession, MovieNight } from "@/lib/interfaces";

export const EmailTemplate: React.FC<Readonly<{ event: BirthdayParty | GamingSession | MovieNight; creatorUsername: string; eventId: string; invitee: string }>> = ({ event, creatorUsername, eventId, invitee }) => (
	<div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333", padding: "20px", maxWidth: "600px", margin: "0 auto", border: "1px solid #ddd", borderRadius: "8px" }}>
		<h1 style={{ color: "#d23669", textAlign: "center" }}>Hello there!</h1>
		<p style={{ fontSize: "16px" }}>
			You've been invited by your friend <strong>{creatorUsername}</strong> to a<strong>{"birthdayPerson" in event ? " birthday party" : "game" in event ? " gaming session" : " movie night"}</strong> they're organizing!
		</p>

		<div style={{ margin: "20px 0", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
			<p>
				<strong>Title:</strong> {event.title}
			</p>
			<p>
				<strong>Date:</strong> {event.date.toUTCString()}
			</p>
			<p>
				<strong>Location:</strong> {event.location}
			</p>
			{"birthdayPerson" in event && (
				<p>
					<strong>Birthday Person:</strong> {event.birthdayPerson}
				</p>
			)}
			{"game" in event && "platform" in event && (
				<>
					<p>
						<strong>Game:</strong> {event.game}
					</p>
					<p>
						<strong>Platform:</strong> {event.platform}
					</p>
				</>
			)}
			{"movie" in event && "rating" in event && (
				<>
					<p>
						<strong>Movie:</strong> {event.movie}
					</p>
					<p>
						<strong>Rating:</strong> {event.rating}
					</p>
				</>
			)}
		</div>

		<h2 style={{ color: "#444", textAlign: "center", margin: "30px 0 10px" }}>Do you wish to join?</h2>
		<p style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>We won't tell the organizer if you say no.</p>

		<div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px", marginRight: "20px" }}>
			<a href={`http://localhost:3000/api/accept-event/${eventId}/${invitee}`} style={{ textDecoration: "none", padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>
				Accept
			</a>
			<a href={`http://localhost:3000/api/decline-event/${eventId}/${invitee}`} style={{ textDecoration: "none", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", fontWeight: "bold" }}>
				Decline
			</a>
		</div>
	</div>
);
