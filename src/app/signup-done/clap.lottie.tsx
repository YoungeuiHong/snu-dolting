"use client";
import { lottieContainer } from "@/app/signup-done/page.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const ClapLottie = () => {
  return (
    <div className={lottieContainer}>
      <DotLottieReact src="/lottie/clap.lottie" loop={false} autoplay={true} />
    </div>
  );
};
