"use client";
import { SvgIconButton } from "@/components/button";
import { usePathname, useRouter } from "next/navigation";
import { gnbButton } from "@/components/gnb/gnb.css";

interface Props {
  src: string;
  alt: string;
  url: string;
}

export const GnbButton = ({ src, alt, url }: Props) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <SvgIconButton
      src={src}
      alt={alt}
      width={20}
      height={20}
      onClick={() => router.push(url)}
      className={gnbButton}
      svgStyle={{
        filter:
          path === url
            ? "invert(41%) sepia(73%) saturate(1500%) hue-rotate(248deg) brightness(75%) contrast(110%)"
            : "",
      }}
    />
  );
};
