"use client";
import { useState } from "react";
import Image from "next/image";
import { actionBar, chattingButton } from "@/app/profile/[nickname]/page.css";
import { transparentButton } from "@/app/shared.css";
import {
  addScrap,
  findOrCreateChatRoom,
  removeScrap,
} from "@/app/profile/[nickname]/action";
import { toastError } from "@/utils/error";

interface Props {
  isScrapped: boolean;
  targetUserId: string;
  targetNickname: string;
}

export const ActionBar = ({
  isScrapped,
  targetUserId,
  targetNickname,
}: Props) => {
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
      setScrapped(currentStatus);
      toastError(error);
    }
  };

  const goToChatRoom = async () => {
    try {
      await findOrCreateChatRoom(targetNickname);
    } catch (e) {
      if (e instanceof Error && e.message !== "NEXT_REDIRECT") {
        toastError(e);
      }
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
      <button className={chattingButton} onClick={goToChatRoom}>
        채팅 보내기
      </button>
    </div>
  );
};
