"use client";
import { SvgIconButton } from "@/components/button";
import { useRouter } from "next/navigation";
import { gnbButton } from "@/components/gnb/gnb.css";

interface Props {
  src: string;
  alt: string;
  url: string;
}

export const GnbButton = ({ src, alt, url }: Props) => {
  const router = useRouter();
  return (
    <SvgIconButton
      src={src}
      alt={alt}
      width={20}
      height={20}
      onClick={() => router.push(url)}
      className={gnbButton}
    />
  );
};
