import { transparentButton } from "@/app/shared.css";
import Image from "next/image";
import { CSSProperties } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick: () => void;
  style?: CSSProperties;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const SvgIconButton = ({
  src,
  alt,
  width,
  height,
  onClick,
  style,
  label,
  className,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`${transparentButton} ${className || ""}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <Image src={src} alt={alt} width={width} height={height} />
      {label && label}
    </button>
  );
};
