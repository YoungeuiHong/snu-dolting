import React, { useEffect, useRef } from "react";
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
        actionBarRef.current.style.transform = `translateY(-${offset > 0 ? offset : 0}px)`;
      }
    };

    updateBottomPosition();

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", updateBottomPosition);

    return () => {
      viewport?.removeEventListener("resize", updateBottomPosition);
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
