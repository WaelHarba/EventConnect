"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { respondToFriendRequest } from "@/lib/actions";

export default function RequestResponse({ senderUsername, senderEmail, senderPic }: { senderUsername: string; senderEmail: string; senderPic: string }) {
	const { pending } = useFormStatus();
	return (
		<div className="gap-2 flex">
			<Button
				size="sm"
				disabled={pending}
				onClick={async () => {
					await respondToFriendRequest(true, senderUsername, senderEmail, senderPic);
				}}
			>
				<Check />
			</Button>
			<Button
				variant="destructive"
				size="sm"
				disabled={pending}
				onClick={async () => {
					await respondToFriendRequest(false, senderUsername, senderEmail, senderPic);
				}}
			>
				<X />
			</Button>
		</div>
	);
}
