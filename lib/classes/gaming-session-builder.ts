import { BaseEventBuilder } from "@/lib/classes/event-builder";
import { GamingSession } from "@/lib/interfaces";

export class GamingSessionBuilder extends BaseEventBuilder<GamingSession> {
	setGame(game: string) {
		this.event.game = game;
	}

	setPlatform(platform: string) {
		this.event.platform = platform;
	}
}
