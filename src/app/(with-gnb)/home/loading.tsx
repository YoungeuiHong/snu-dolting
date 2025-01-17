import { Skeleton } from "@/components/skeleton/Skeleton";
import { filterContainer } from "@/app/(with-gnb)/home/components/FilterButton.css";
import { loadingContainer } from "@/app/shared.css";

export default function Loading() {
  return (
    <div className={loadingContainer}>
      <div className={filterContainer}>
        <Skeleton width={30} height={30} borderRadius={30} />
      </div>
      <Skeleton height={192} borderRadius={10} />
      <Skeleton height={192} borderRadius={10} />
      <Skeleton height={192} borderRadius={10} />
    </div>
  );
}
