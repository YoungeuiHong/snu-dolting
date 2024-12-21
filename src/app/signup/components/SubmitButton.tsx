import { useEffect, useState } from "react";
import { actionBar, nextButton } from "@/app/signup/form.css";
import { LoadingDots } from "@/components/loading/LoadingDots";

interface Props {
  pending: boolean;
}

export const SubmitButton = ({ pending }: Props) => {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const handleResize = () => {
      animationFrame = requestAnimationFrame(() => {
        const viewportHeight =
          window.visualViewport?.height || window.innerHeight;
        const totalHeight = window.innerHeight;
        const offset = totalHeight - viewportHeight;
        if (Math.abs(bottomOffset - offset) > 1) {
          setBottomOffset(offset > 0 ? offset : 0);
        }
      });
    };

    window.visualViewport?.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [bottomOffset]);

  return (
    <div className={actionBar} style={{ bottom: `${bottomOffset}px` }}>
      <button className={nextButton} type="submit" disabled={pending}>
        {pending ? <LoadingDots loading={pending} /> : "다음"}
      </button>
    </div>
  );
};
