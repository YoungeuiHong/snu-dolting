import { Skeleton } from "@/components/skeleton/Skeleton";

export const MainLoading = () => {
  return (
    <>
      <Skeleton height={192} borderRadius={10} />
      <Skeleton height={192} borderRadius={10} />
      <Skeleton height={192} borderRadius={10} />
    </>
  );
};
