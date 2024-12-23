import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function Home() {
	return (
		<div className="flex flex-col items-center gap-10 mt-10">
			<div>
				<p className="text-lg">Never Miss an Event Again! Organize, Invite, and Stay on Track with EventConnect</p>
				<p className="text-4xl mt-5 text-sky-400 font-bold">Features</p>
				<Separator />
				<ul className="list-disc mt-3 text-lg">
					<li>Find & add your friends on the platform</li>
					<li>Organize birthday, gaming, or movie events! More to come...</li>
					<li>Invite your friends to your events</li>
					<li>Get email reminders to events</li>
					<li>You don't want to go? Decline the invite and we don't tell anyone shhh</li>
				</ul>
			</div>

			<Image alt="Image of application branding" quality={100} src="/home.png" width={350} height={350} />
		</div>
	);
}
