"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  buttonContainer,
  container,
  errorMessage,
  errorTitle,
  homeButton,
  lottieWrapper,
  retryButton,
  wrapper,
} from "./error.css";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={container}>
      <div className={wrapper}>
        <div className={lottieWrapper}>
          <DotLottieReact src="/lottie/warning.lottie" autoplay />
        </div>
        <h2 className={errorTitle}>문제가 발생했습니다!</h2>
        <p className={errorMessage}>{error.message}</p>
        <div className={buttonContainer}>
          <button onClick={() => reset()} className={retryButton}>
            다시 시도하기
          </button>
          <Link href="/home" className={homeButton}>
            홈으로 이동하기
          </Link>
        </div>
      </div>
    </div>
  );
}
