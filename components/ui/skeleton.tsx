export default function Skeleton() {
	return (
		<div className="flex h-[80vh] flex-col items-center justify-center gap-2">
			<div className="animate-pulse rounded-md bg-primary/10 w-[200px] h-[30px]" />
			<div className="flex flex-col gap-2">
				<div className="animate-pulse rounded-md bg-primary/10 w-[10rem] h-[20px]" />
				<div className="animate-pulse w-[30rem] h-[45px] bg-primary/10 rounded-md" />
			</div>
			<div className="animate-pulse mt-5 w-[30rem] h-[45px] bg-primary/10 rounded-md" />
		</div>
	);
}
