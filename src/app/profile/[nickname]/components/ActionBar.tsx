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
import { getQueryClient } from "@/utils/react-query";

interface Props {
  isScrapped: boolean;
  targetNickname: string;
}

export const ActionBar = ({ isScrapped, targetNickname }: Props) => {
  const [scrapped, setScrapped] = useState(isScrapped);

  const queryClient = getQueryClient();

  const handleScrapToggle = async () => {
    const currentStatus = scrapped;
    setScrapped(!currentStatus);

    try {
      if (currentStatus) {
        await removeScrap(targetNickname);
      } else {
        await addScrap(targetNickname);
      }
    } catch (error) {
      setScrapped(currentStatus);
      toastError(error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["scraps"] });
      queryClient.invalidateQueries({ queryKey: ["isScrapped", targetNickname] });
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
