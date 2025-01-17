import { Skeleton } from "@/components/skeleton/Skeleton";
import { loadingContainer } from "@/app/shared.css";

export default function Loading() {
  return (
    <div className={loadingContainer}>
      <Skeleton height={70} borderRadius={5} />
      <Skeleton height={70} borderRadius={5} />
      <Skeleton height={70} borderRadius={5} />
      <Skeleton width="90%" height={70} borderRadius={5} />
      <Skeleton width="40%" height={70} borderRadius={5} />
    </div>
  );
}
