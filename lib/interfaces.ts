export interface Event {
	title: string;
	invitees: string[];
	date: Date;
	location: string;
}

export interface GamingSession extends Event {
	game: string;
	platform: string;
}

export interface BirthdayParty extends Event {
	birthdayPerson: string;
}

export interface MovieNight extends Event {
	movie: string;
	rating: string;
}
