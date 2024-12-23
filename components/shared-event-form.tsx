import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { User } from "@/lib/types";
import { DateTimePicker } from "@/components/ui/datetime-picker";

export default function SharedEventForm({ builder, friendsList }: { builder: any; friendsList: User[] }) {
	const [date, setDate] = useState<Date>();
	const [invitees, setInvitees] = useState<string[]>();

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		builder.setTitle(e.target.value);
	};

	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		builder.setLocation(e.target.value);
	};

	const handleDateChange = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			builder.setDate(selectedDate);
			setDate(selectedDate);
		}
	};

	useEffect(() => {
		if (invitees) {
			builder.setInvitees(invitees);
		}
	}, [invitees]);

	return (
		<div className="flex flex-col gap-5 mt-5">
			<div>
				<label>Event Title</label>
				<Input className="w-[30rem] flex-1" type="text" placeholder="John's birthday, Bloodborne gaming sesh, Inception movie, etc..." onChange={handleTitleChange} />
			</div>
			<div>
				<label>Invitee List</label>
				<MultiSelect className="w-[30rem] flex-1" options={friendsList} onValueChange={setInvitees} />
			</div>
			<div>
				<label>Date</label>
				<DateTimePicker hourCycle={12} value={date} onChange={handleDateChange} />
			</div>
			<div>
				<label>Event Location</label>
				<Input className="w-[30rem] flex-1" type="text" placeholder="Splitsville, Discord, Stoney Creek Cineplex, etc..." onChange={handleLocationChange} />
			</div>
		</div>
	);
}
