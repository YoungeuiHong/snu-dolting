import { Skeleton } from "@/components/skeleton/Skeleton";
import { loadingContainer } from "@/app/shared.css";

export default function Loading() {
  return (
    <div className={loadingContainer}>
      <Skeleton height={192} borderRadius={10} />
      <Skeleton height={192} borderRadius={10} />
      <Skeleton height={192} borderRadius={10} />
    </div>
  );
}
