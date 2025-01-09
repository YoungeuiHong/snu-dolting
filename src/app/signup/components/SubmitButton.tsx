import { actionBar, nextButton } from "@/app/signup/form.css";
import { LoadingDots } from "@/components/loading/LoadingDots";

interface Props {
  pending: boolean;
}

export const SubmitButton = ({ pending }: Props) => {
  return (
    <div className={actionBar}>
      <button className={nextButton} type="submit" disabled={pending}>
        {pending ? <LoadingDots loading={pending} /> : "다음"}
      </button>
    </div>
  );
};
