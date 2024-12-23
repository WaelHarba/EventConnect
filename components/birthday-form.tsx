import SharedEventForm from "@/components/shared-event-form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { BirthdayPartyBuilder } from "@/lib/classes/birthday-party-builder";
import { useState } from "react";
import { createEvent } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";

export default function BirthdayForm({ friendsList }: { friendsList: User[] }) {
	const { toast } = useToast();
	const [birthdayPartyBuilder] = useState(new BirthdayPartyBuilder());

	const handleBirthdayPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		birthdayPartyBuilder.setBirthdayPerson(e.target.value);
	};

	const handleSubmit = async () => {
		const birthdayParty = birthdayPartyBuilder.build();
		const state = await createEvent(birthdayParty);
		if (state) {
			toast({
				variant: state.success ? "default" : "destructive",
				description: <div className="flex gap-2 items-center">{state.message}</div>,
			});
		}
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-2xl text-sky-400">🎂 Birthday Form 🎂</p>
			<Separator />
			<SharedEventForm builder={birthdayPartyBuilder} friendsList={friendsList} />
			<div>
				<label>Birthday Person</label>
				<Input className="w-[30rem] flex-1" type="text" placeholder="Johnny Depp" onChange={handleBirthdayPersonChange} />
			</div>
			<Button className="mt-5" onClick={handleSubmit}>
				Create birthday party
			</Button>
		</div>
	);
}
