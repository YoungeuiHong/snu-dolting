"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { content, exitButton, header } from "@/app/signup/form.css";
import { transparentButton } from "@/app/shared.css";
import { moveToPrevUrl } from "@/app/signup/utils/steps";
import { useCookie } from "@/hooks/cookie";
import { logout } from "@/app/(with-gnb)/setting/action";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isSignupDone = useCookie("complete");

  const handleClickPrev = () => {
    moveToPrevUrl(pathname);
  };

  const handleClickExit = async () => {
    if (isSignupDone === "yes") {
      router.push("/setting");
    } else {
      await logout();
    }
  };

  return (
    <>
      <div className={header}>
        <button className={transparentButton} onClick={handleClickPrev}>
          <Image src="/icon/prev.svg" alt="이전" width={24} height={24} />
        </button>
        <button className={exitButton} onClick={handleClickExit}>
          종료
        </button>
      </div>
      <div className={content}>{children}</div>
    </>
  );
}
