import { BaseEventBuilder } from "@/lib/classes/event-builder";
import { BirthdayParty } from "@/lib/interfaces";

export class BirthdayPartyBuilder extends BaseEventBuilder<BirthdayParty> {
	setBirthdayPerson(birthdayPerson: string) {
		this.event.birthdayPerson = birthdayPerson;
	}
}
