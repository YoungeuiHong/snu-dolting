import { loadingContainer } from "@/app/shared.css";
import { Skeleton } from "@/components/skeleton/Skeleton";

export default function Loading() {
  return (
    <div className={loadingContainer} style={{ gap: "2px" }}>
      <Skeleton height={57} borderRadius={5} />
      <Skeleton height={57} borderRadius={5} />
      <Skeleton height={57} borderRadius={5} />
    </div>
  );
}
