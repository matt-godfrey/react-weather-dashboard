import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

interface Props {}

export default function AdditionalInfoSkeleton({}: Props) {
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex justify-between" key={index}>
          <div className="flex gap-4">
            <Skeleton className="w-20 h-8"></Skeleton>
            <Skeleton className="size-8 rounded-full"></Skeleton>
          </div>
          <Skeleton className="size-8"></Skeleton>
        </div>
      ))}
    </Card>
  );
}
