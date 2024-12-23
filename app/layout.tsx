import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme.provider";
import NavigationBar from "@/components/navigation-bar";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
	title: "EventConnect",
	description: "Platform to create events for your needs. You don't have to worry about reminders because we handle that for you. ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<NavigationBar />
						{children}
					</ThemeProvider>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
