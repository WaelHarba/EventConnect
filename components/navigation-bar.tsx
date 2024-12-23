import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function NavigationBar() {
	return (
		<>
			<div className="flex justify-between w-full p-4">
				<div className="flex items-center gap-2">
					<Link href={"/"} className="text-4xl font-extrabold text-sky-400">
						EventConnect
					</Link>
					<ThemeToggle />
				</div>

				<div className="flex gap-4 items-center">
					<SignedIn>
						<Link className="text-lg" href="/events">
							Events
						</Link>
						<Link className="text-lg" href="/friends">
							Friends
						</Link>
						<UserButton />
					</SignedIn>

					<SignedOut>
						<SignInButton>
							<Button>Sign in</Button>
						</SignInButton>

						<SignUpButton>
							<Button>Sign up</Button>
						</SignUpButton>
					</SignedOut>
				</div>
			</div>

			<Separator />
		</>
	);
}
