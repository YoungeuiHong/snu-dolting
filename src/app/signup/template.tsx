"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { content, header } from "@/app/signup/form.css";
import { transparentButton } from "@/app/shared.css";
import { useSignupStore } from "@/store/signup";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { handlePrev } = useSignupStore();

  const handleClickPrev = () => {
    const prevPath = handlePrev();
    router.push(prevPath);
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
