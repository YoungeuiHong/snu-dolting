"use client";
import Image from "next/image";
import { CSSProperties, useState } from "react";

interface Props {
  src: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  style?: CSSProperties;
}

export const ImageWithFallback = ({
  src = "/images/fallback.webp",
  alt,
  fill,
  width,
  height,
  sizes,
  style,
}: Props) => {
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <Image
      src={hasError ? "/images/fallback.webp" : src || "/images/fallback.webp"}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      style={{ ...style }}
      onError={() => setHasError(true)}
    />
  );
};
