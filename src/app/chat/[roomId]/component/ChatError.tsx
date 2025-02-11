"use client";
import {
  buttonContainer,
  container,
  errorMessage,
  errorTitle,
  homeButton,
  lottieWrapper,
  wrapper,
} from "@/app/error.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import React from "react";

export const ChatError = () => {
  return (
    <div className={container}>
      <div className={wrapper}>
        <div className={lottieWrapper}>
          <DotLottieReact src="/lottie/warning.lottie" autoplay />
        </div>
        <h2 className={errorTitle}>문제가 발생했습니다!</h2>
        <p className={errorMessage}>채팅방에 다시 접속해주세요.</p>
        <div className={buttonContainer}>
          <Link href="/chat" className={homeButton}>
            채팅목록으로 이동하기
          </Link>
        </div>
      </div>
    </div>
  );
};
