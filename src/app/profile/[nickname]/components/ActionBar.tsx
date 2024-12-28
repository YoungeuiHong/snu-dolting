"use client";
import { useState } from "react";
import Image from "next/image";
import { actionBar, chattingButton } from "@/app/profile/[nickname]/page.css";
import { transparentButton } from "@/app/shared.css";
import { addScrap, removeScrap } from "@/app/profile/[nickname]/action";

interface Props {
  isScrapped: boolean;
  targetUserId: string;
}

export const ActionBar = ({ isScrapped, targetUserId }: Props) => {
  const [scrapped, setScrapped] = useState(isScrapped);

  const handleScrapToggle = async () => {
    const currentStatus = scrapped;
    setScrapped(!currentStatus);

    try {
      if (currentStatus) {
        await removeScrap(targetUserId);
      } else {
        await addScrap(targetUserId);
      }
    } catch (error) {
      console.error("Error updating scrap status:", error);
      setScrapped(currentStatus);
    }
  };

  return (
    <div className={actionBar}>
      <button className={transparentButton} onClick={handleScrapToggle}>
        {scrapped ? (
          <Image
            src="/icon/bookmark_filled.svg"
            alt="스크랩"
            width={25}
            height={25}
          />
        ) : (
          <Image
            src="/icon/bookmark_outlined.svg"
            alt="스크랩"
            width={25}
            height={25}
          />
        )}
      </button>
      <button className={chattingButton}>채팅 보내기</button>
    </div>
  );
};
