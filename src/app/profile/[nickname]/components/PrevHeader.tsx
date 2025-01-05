"use client";
import Image from "next/image";
import { prevHeader } from "@/app/profile/[nickname]/page.css";
import { transparentButton } from "@/app/shared.css";
import { useRouter } from "next/navigation";

export const PrevHeader = () => {
  const router = useRouter();

  return (
    <div className={prevHeader}>
      <button
        className={transparentButton}
        onClick={() => router.push("/home")}
      >
        <Image src="/icon/prev.svg" alt="이전" width={24} height={24} />
      </button>
    </div>
  );
};
