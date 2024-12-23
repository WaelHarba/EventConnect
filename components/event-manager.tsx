"use client";

import { lazy, Suspense, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/lib/types";
import Skeleton from "@/components/ui/skeleton";

const GamingForm = lazy(() => import("@/components/gaming-form"));
const BirthdayForm = lazy(() => import("@/components/birthday-form"));
const MovieForm = lazy(() => import("@/components/movie-form"));

export default function EventManager({ friendsList }: { friendsList: User[] }) {
	const [eventType, setEventType] = useState("");

	return (
		<div className="p-5">
			<div className="flex items-center gap-2">
				<Select onValueChange={setEventType}>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder="Select your event type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="gaming">Gaming Session 🎮</SelectItem>
						<SelectItem value="movie">Movie Night 📽️</SelectItem>
						<SelectItem value="birthday">Birthday Party 🎈</SelectItem>
					</SelectContent>
				</Select>
			</div>
			{eventType === "gaming" ? (
				<Suspense fallback={<Skeleton />}>
					<GamingForm friendsList={friendsList} />
				</Suspense>
			) : eventType === "birthday" ? (
				<Suspense fallback={<Skeleton />}>
					<BirthdayForm friendsList={friendsList} />
				</Suspense>
			) : (
				eventType === "movie" && (
					<Suspense fallback={<Skeleton />}>
						<MovieForm friendsList={friendsList} />
					</Suspense>
				)
			)}
		</div>
	);
}
