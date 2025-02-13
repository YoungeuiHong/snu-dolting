"use client";
import { usePathname } from "next/navigation";
import { badgeContainer, gnbBadge, gnbButton } from "@/components/gnb/gnb.css";
import Image from "next/image";
import Link from "next/link";

interface Props {
  src: string;
  alt: string;
  url: string;
  hasBadge?: boolean;
}

export const GnbButton = ({ src, alt, url, hasBadge = false }: Props) => {
  const path = usePathname();

  return (
    <Link href={url} className={gnbButton}>
      <div className={badgeContainer}>
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
        {hasBadge && <span className={gnbBadge} />}
      </div>
    </Link>
  );
};
