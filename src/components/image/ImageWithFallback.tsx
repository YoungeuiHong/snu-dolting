import Image from "next/image";
import { CSSProperties, useState } from "react";

interface Props {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  style?: CSSProperties;
}

export const ImageWithFallback = ({
  src = "/images/fallback.webp",
  alt,
  width,
  height,
  style,
}: Props) => {
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <Image
      src={hasError ? "/images/fallback.webp" : src || "/images/fallback.webp"}
      alt={alt}
      width={width}
      height={height}
      style={{ ...style }}
      onError={() => setHasError(true)}
    />
  );
};
