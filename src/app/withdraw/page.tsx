"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PrevHeader } from "@/components/header";
import {
  container,
  withdrawalButton,
  withdrawalTitle,
  withdrawMessage,
  withdrawMessageContainer,
} from "@/app/withdraw/page.css";
import { withdraw } from "@/app/withdraw/action";

export default function WithdrawalPage() {
  const router = useRouter();

  const handleClickWithdrawal = async () => {
    withdraw()
      .then(() => router.push("/"))
      .catch((e) => {
        if (e instanceof Error && e.message !== "NEXT_REDIRECT") {
          toast("탈퇴에 실패했습니다");
        }
      });
  };

  return (
    <>
      <PrevHeader href="/setting" />
      <div className={container}>
        <p className={withdrawalTitle}>탈퇴하시겠습니까?</p>
        <div className={withdrawMessageContainer}>
          <ul className={withdrawMessage}>
            <li>이번 스누돌팅 서비스에서 재가입은 불가능합니다.</li>
            <li>내 프로필이 삭제되고 다른 사람들이 볼 수 없게 됩니다.</li>
            <li>채팅방 대화 내역은 삭제되지 않습니다.</li>
            <li>
              채팅했던 상대방에게는 &apos;탈퇴한 사용자&apos;로 표시되고, 프로필
              이미지는 내 사진이 아닌 기본 이미지로 보입니다.
            </li>
          </ul>
        </div>
        <p className={withdrawMessage}>
          이 작업은 되돌릴 수 없습니다. 탈퇴하시겠습니까?
        </p>
        <button className={withdrawalButton} onClick={handleClickWithdrawal}>
          탈퇴하기
        </button>
      </div>
    </>
  );
}
