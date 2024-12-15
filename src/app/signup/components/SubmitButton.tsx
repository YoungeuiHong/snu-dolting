import React from "react";
import { actionBar, nextButton } from "@/app/signup/form.css";
import { dot, loaderContainer } from "@/app/signup/loading.css";

interface Props {
  pending: boolean;
}

export const SubmitButton = ({ pending }: Props) => {
  return (
    <div className={actionBar}>
      <button className={nextButton} type="submit" disabled={pending}>
        {pending ? (
          <div className={loaderContainer}>
            <span className={dot} />
            <span className={dot} />
            <span className={dot} />
          </div>
        ) : (
          "다음"
        )}
      </button>
    </div>
  );
};
