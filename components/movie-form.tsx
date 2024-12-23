import SharedEventForm from "@/components/shared-event-form";
import { Separator } from "./ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MovieNightBuilder } from "@/lib/classes/movie-night-builder";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createEvent } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/lib/types";

export default function MovieForm({ friendsList }: { friendsList: User[] }) {
	const { toast } = useToast();
	const [movieNightBuilder] = useState(new MovieNightBuilder());

	const handleMovieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		movieNightBuilder.setMovie(e.target.value);
	};

	const handleRatingChange = (rating: string) => {
		movieNightBuilder.setRating(rating);
	};

	const handleSubmit = async () => {
		const movieNight = movieNightBuilder.build();
		const state = await createEvent(movieNight);
		if (state) {
			toast({
				variant: state.success ? "default" : "destructive",
				description: <div className="flex gap-2 items-center">{state.message}</div>,
			});
		}
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-2xl text-sky-400">📽️ Movie Night Form 📽️</p>
			<Separator />
			<SharedEventForm builder={movieNightBuilder} friendsList={friendsList} />
			<div>
				<label>Movie</label>
				<Input className="w-[30rem] flex-1" type="text" placeholder="Inception, Titanic, etc..." onChange={handleMovieChange} />
			</div>
			<div>
				<label>Rating</label>
				<Select onValueChange={handleRatingChange}>
					<SelectTrigger className="w-[30rem]">
						<SelectValue placeholder="Select a rating" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="G">G - General Audience</SelectItem>
						<SelectItem value="PG">PG - Parental Guidance</SelectItem>
						<SelectItem value="PG-13">PG-13 - Parents Strongly Cautioned</SelectItem>
						<SelectItem value="R">R - Restricted</SelectItem>
						<SelectItem value="NC-17">NC-17 - Adults Only</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button type="submit" className="mt-5" onClick={handleSubmit}>
				Create movie evening
			</Button>
		</div>
	);
}
