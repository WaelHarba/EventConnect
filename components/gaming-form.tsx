import SharedEventForm from "@/components/shared-event-form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { GamingSessionBuilder } from "@/lib/classes/gaming-session-builder";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createEvent } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/lib/types";

export default function GamingForm({ friendsList }: { friendsList: User[] }) {
	const { toast } = useToast();
	const [gamingSessionBuilder] = useState(new GamingSessionBuilder());

	const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		gamingSessionBuilder.setGame(e.target.value);
	};

	const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		gamingSessionBuilder.setPlatform(e.target.value);
	};

	const handleSubmit = async () => {
		const gamingSession = gamingSessionBuilder.build();
		const state = await createEvent(gamingSession);
		if (state && state.message) {
			toast({
				variant: state.success ? "default" : "destructive",
				description: <div className="flex gap-2 items-center">{state.message}</div>,
			});
		}
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-2xl text-sky-400">🎮 Gaming Session Form 🎮</p>
			<Separator />
			<SharedEventForm builder={gamingSessionBuilder} friendsList={friendsList} />
			<div>
				<label>Game</label>
				<Input className="w-[30rem] flex-1" type="text" placeholder="Bloodborne, Minecraft, etc..." onChange={handleGameChange} />
			</div>
			<div>
				<label>Platform</label>
				<Input className="w-[30rem] flex-1" type="text" placeholder="PlayStation, Xbox, etc..." onChange={handlePlatformChange} />
			</div>
			<Button className="mt-5" onClick={handleSubmit}>
				Create gaming session
			</Button>
		</div>
	);
}
