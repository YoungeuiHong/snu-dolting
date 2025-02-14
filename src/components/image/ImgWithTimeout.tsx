"use client";
import { CSSProperties, useEffect, useState } from "react";
import {
  imgContainer,
  timeoutGuide,
} from "@/components/image/ImgWithTimeout.css";

interface Props {
  src: string;
  alt: string;
  style?: CSSProperties;
}

export const ImgWithTimeout = ({ src, alt, style }: Props) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to load image");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (isMounted) {
          setBlobUrl(url);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      }
    };

    fetchImage();

    const timeout = setTimeout(() => {
      if (isMounted) setHasError(true);
    }, 30 * 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [src]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  return (
    <div className={imgContainer}>
      <div className={timeoutGuide}>전송 이후 30초 동안만 볼 수 있어요!</div>
      <img
        key={`${src}#t=${Date.now()}`}
        src={
          hasError || isLoading
            ? "/images/fallback.webp"
            : blobUrl || "/images/fallback.webp"
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
      />
    </div>
  );
};
