"use client";
import Image from "next/image";
import { prevHeader } from "@/app/profile/[nickname]/page.css";
import { transparentButton } from "@/app/shared.css";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props {
  href?: string;
}

export const PrevHeader = ({ href }: Props) => {
  const router = useRouter();

  const goToPrev = useCallback(() => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }, [router, href]);

  return (
    <div className={prevHeader}>
      <button className={transparentButton} onClick={goToPrev}>
        <Image src="/icon/prev.svg" alt="이전" width={24} height={24} />
      </button>
    </div>
  );
};
