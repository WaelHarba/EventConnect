import { Event } from "@/lib/interfaces";

export class BaseEventBuilder<T extends Event> {
	protected event: Partial<T> = {};

	setTitle(title: string) {
		this.event.title = title;
	}

	setInvitees(invitees: string[]) {
		this.event.invitees = invitees;
	}

	setDate(date: Date) {
		this.event.date = date;
	}

	setLocation(location: string) {
		this.event.location = location;
	}

	build(): T {
		return this.event as T;
	}
}
