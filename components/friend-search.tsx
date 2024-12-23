"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchForUser, sendFriendRequest } from "@/lib/actions";
import { UserRoundSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialState = {
	message: "",
	success: false,
	userFound: undefined,
};

export default function friendSearch() {
	const [state, formAction, isPending] = useActionState(searchForUser, initialState);
	const { toast } = useToast();

	useEffect(() => {
		if (state.success && state.message && state.userFound) {
			toast({
				variant: "default",
				description: (
					<div className="flex gap-2 items-center">
						<Avatar>
							<AvatarImage src={state.userFound.profilePic} />
							<AvatarFallback>Avatar Image Missing</AvatarFallback>
						</Avatar>
						{state.message}
					</div>
				),
				action: (
					<ToastAction
						altText="Send friend request"
						onClick={async () => {
							if (state.userFound && state.userFound.username && state.userFound.username) await sendFriendRequest(state.userFound.username, state.userFound.email, state.userFound.profilePic);
						}}
					>
						Send friend request
					</ToastAction>
				),
			});
		} else if (!state.success && state.message) {
			toast({
				variant: "destructive",
				description: state.message,
			});
		}
	}, [state]);

	return (
		<form action={formAction}>
			<div className="flex w-full max-w-md items-center space-x-2">
				<Input type="text" min={4} max={40} name="username" placeholder="Type a friend's username" />
				<Button type="submit" disabled={isPending}>
					<UserRoundSearch /> Search
				</Button>
			</div>
		</form>
	);
}
