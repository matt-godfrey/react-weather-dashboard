import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";
import { Slider } from "../ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {}

export default function SideCarSkeleton({}: Props) {
  return (
    <Card
      childrenClassName="flex flex-col gap-3"
      className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
    >
      <div className="flex justify-between">
        <Skeleton className="w-12 h-7"></Skeleton>
        <Skeleton className="w-12 h-7"></Skeleton>
      </div>
      <Skeleton className="w-full h-1.5"></Skeleton>
      <div className="flex justify-between text-xs">
        <Skeleton className="w-2 h-4"></Skeleton>
        <Skeleton className="w-2 h-4"></Skeleton>{" "}
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-15 h-6 bg-sidebar"></Skeleton>
        ))}
      </div>
    </Card>
  );
}
