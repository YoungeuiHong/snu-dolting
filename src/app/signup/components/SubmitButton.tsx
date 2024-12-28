"use client";
import { useEffect, useRef } from "react";
import { actionBar, nextButton } from "@/app/signup/form.css";
import { LoadingDots } from "@/components/loading/LoadingDots";

interface Props {
  pending: boolean;
}

export const SubmitButton = ({ pending }: Props) => {
  const actionBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBottomPosition = () => {
      if (actionBarRef.current) {
        const viewportHeight =
          window.visualViewport?.height || window.innerHeight;
        const totalHeight = window.innerHeight;
        const offset = totalHeight - viewportHeight;
        requestAnimationFrame(() => {
          actionBarRef.current!.style.bottom = `${offset > 0 ? offset : 0}px`;
        });
      }
    };

    updateBottomPosition();

    window.visualViewport?.addEventListener("resize", updateBottomPosition);

    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        updateBottomPosition,
      );
    };
  }, []);

  return (
    <div ref={actionBarRef} className={actionBar}>
      <button className={nextButton} type="submit" disabled={pending}>
        {pending ? <LoadingDots loading={pending} /> : "다음"}
      </button>
    </div>
  );
};
