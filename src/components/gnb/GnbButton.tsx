"use client";
import { usePathname } from "next/navigation";
import { gnbButton } from "@/components/gnb/gnb.css";
import Image from "next/image";
import Link from "next/link";

interface Props {
  src: string;
  alt: string;
  url: string;
}

export const GnbButton = ({ src, alt, url }: Props) => {
  const path = usePathname();

  return (
    <Link href={url} className={gnbButton}>
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        style={{
          filter:
            path === url
              ? "invert(41%) sepia(73%) saturate(1500%) hue-rotate(248deg) brightness(75%) contrast(110%)"
              : "",
        }}
      />
    </Link>
  );
};
