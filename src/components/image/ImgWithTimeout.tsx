"use client";
import { CSSProperties, useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  style?: CSSProperties;
}

export const ImgWithTimeout = ({ src, alt, style }: Props) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasError(true);
    }, 30 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <img
      src={hasError ? "/images/fallback.webp" : src}
      alt={alt}
      style={style}
      onError={() => setHasError(true)}
    />
  );
};
