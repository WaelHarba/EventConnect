import FriendSearch from "@/components/friend-search";
import RequestResponse from "@/components/request-response";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DatabaseLibrary from "@/lib/classes/database-library";
import { currentUser } from "@clerk/nextjs/server";

export default async function Friends() {
	const dbLibrary = new DatabaseLibrary();
	const user = await currentUser();
	const friends = await dbLibrary.managedQueryExec(`SELECT * FROM friendships WHERE (username = '${user?.username}' AND status = 'ACCEPTED') OR (friend_username = '${user?.username}' AND status = 'PENDING')`);

	return (
		<div className="p-5">
			<FriendSearch />
			<div className="flex mt-4 gap-10">
				<div className="flex-1">
					<p className="text-2xl text-center">List of friends</p>
					<Separator className="mb-3" />
					{friends.rows.map(
						(row, index) =>
							row.username === user?.username && (
								<div key={index} className="flex items-center">
									<p className="text-emerald-400 mr-4">Friend {index + 1}:</p>
									<Avatar className="mr-1">
										<AvatarImage src={row.friend_pic} />
										<AvatarFallback>Avatar Image Missing</AvatarFallback>
									</Avatar>
									{row.friend_username}
								</div>
							)
					)}
				</div>
				<div className="flex-1">
					<p className="text-2xl text-center">Pending requests</p>
					<Separator className="mb-3" />
					{friends.rows.map(
						(row, index) =>
							row.friend_username === user?.username && (
								<div key={index}>
									<p className="text-emerald-400">Request {index + 1}:</p>
									<div className="flex items-center">
										<Avatar className="mr-2">
											<AvatarImage src={row.profile_pic} />
											<AvatarFallback>Avatar Image Missing</AvatarFallback>
										</Avatar>
										<p className="mr-10">{row.username}</p>
										<RequestResponse senderUsername={row.username} senderEmail={row.email} senderPic={row.profile_pic} />
									</div>
								</div>
							)
					)}
				</div>
			</div>
		</div>
	);
}
