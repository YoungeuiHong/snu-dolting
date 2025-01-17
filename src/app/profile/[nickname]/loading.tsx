import { Skeleton } from "@/components/skeleton/Skeleton";
import { loadingContainer } from "@/app/shared.css";

export default function Loading() {
  return (
    <div className={loadingContainer} style={{ padding: "10px" }}>
      <Skeleton width={40} height={40} borderRadius={40} />
      <Skeleton height={296} borderRadius={10} />
      <Skeleton height={177} borderRadius={10} />
      <Skeleton height={110} borderRadius={10} />
      <Skeleton height={193} borderRadius={10} />
    </div>
  );
}
