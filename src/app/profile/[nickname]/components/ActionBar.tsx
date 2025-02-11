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
import { LoadingDots } from "@/components/loading/LoadingDots";

interface Props {
  isScrapped: boolean;
  targetNickname: string;
}

export const ActionBar = ({ isScrapped, targetNickname }: Props) => {
  const [scrapped, setScrapped] = useState(isScrapped);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

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
      queryClient.invalidateQueries({
        queryKey: ["isScrapped", decodeURIComponent(targetNickname)],
      });
    }
  };

  const goToChatRoom = async () => {
    try {
      setIsChatLoading(true);
      await findOrCreateChatRoom(targetNickname);
    } catch (e) {
      if (e instanceof Error && e.message !== "NEXT_REDIRECT") {
        toastError(e);
      }
    } finally {
      setIsChatLoading(false);
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
        {isChatLoading ? <LoadingDots loading /> : "채팅 보내기"}
      </button>
    </div>
  );
};
