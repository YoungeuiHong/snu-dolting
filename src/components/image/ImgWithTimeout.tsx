"use client";
import { CSSProperties, useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  style?: CSSProperties;
}

export const ImgWithTimeout = ({ src, alt, style }: Props) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasError(true);
    }, 30 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <img
      src={
        hasError || isLoading
          ? "/images/fallback.webp"
          : `${src}#t=${Date.now()}`
      }
      alt={alt}
      style={{
        ...style,
        userSelect: "none",
        pointerEvents: "none",
        touchAction: "none",
        WebkitTouchCallout: "none",
      }}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoading(false)}
    />
  );
};
