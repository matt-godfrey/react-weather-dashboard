import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

interface Props {}

export default function HourlySkeleton({}: Props) {
  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex flex-row gap-6 overflow-x-scroll"
      // overflow-x-scroll: prevent hourly temps from extending way outside div
      // flex-row: children go horizontally; this is default so not necessary to write
    >
      {Array.from({ length: 48 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col 2xl:justify-between gap-2 items-center p-2"
        >
          <Skeleton className="w-15 h-6"></Skeleton>
          <Skeleton className="size-8 rounded-full"></Skeleton>
          <Skeleton className="w-8 h-6"></Skeleton>
        </div>
      ))}
    </Card>
  );
}
