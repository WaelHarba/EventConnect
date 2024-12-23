import { SmileIcon } from "lucide-react";

export default function EventResponse() {
	return (
		<div className="flex h-[80vh] flex-col items-center justify-center gap-2">
			<SmileIcon className="w-10 text-gray-400" />
			<h2 className="text-xl font-semibold">Thank you for responding!</h2>
		</div>
	);
}
