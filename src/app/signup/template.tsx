"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { content, header } from "@/app/signup/form.css";
import { transparentButton } from "@/app/shared.css";
import { moveToPrevUrl } from "@/app/signup/utils/steps";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const handleClickPrev = () => {
    moveToPrevUrl(pathname);
  };

  return (
    <>
      <div className={header}>
        <button className={transparentButton} onClick={handleClickPrev}>
          <Image src="/icon/prev.svg" alt="이전" width={24} height={24} />
        </button>
      </div>
      <div className={content}>{children}</div>
    </>
  );
}
