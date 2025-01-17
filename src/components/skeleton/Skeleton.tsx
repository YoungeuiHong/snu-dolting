import { skeleton } from "@/components/skeleton/skeleton.css";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
};

export const Skeleton = ({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
}: SkeletonProps) => {
  return (
    <div
      className={skeleton}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius:
          typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
      }}
    />
  );
};
