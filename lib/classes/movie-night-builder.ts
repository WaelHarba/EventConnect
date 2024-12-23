import { BaseEventBuilder } from "@/lib/classes/event-builder";
import { MovieNight } from "@/lib/interfaces";

export class MovieNightBuilder extends BaseEventBuilder<MovieNight> {
	setMovie(movie: string) {
		this.event.movie = movie;
	}

	setRating(rating: string) {
		this.event.rating = rating;
	}
}
