"use client";
import { container, title, titleWrapper } from "@/app/signup/form.css";
import { BinaryChoice, SubmitButton } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateRemarriage } from "@/app/signup/remarriage/action";
import { booleanToString } from "@/utils/type/converts";

interface Props {
  initialRemarriage: boolean | null;
}

export default function Form({ initialRemarriage }: Props) {
  const { state, formAction, pending } = useSignupForm(updateRemarriage, {
    remarriage_intent: initialRemarriage,
  });

  const remarriageIntentValue = booleanToString(state?.user?.remarriage_intent);

  return (
    <form action={formAction} className={container}>
      <div className={titleWrapper}>
        <p className={title}>재혼 의향이 있으신가요?</p>
      </div>
      <BinaryChoice
        name="remarriage_intent"
        label="재혼 의향"
        options={[
          { value: "false", label: "아니요" },
          { value: "true", label: "예" },
        ]}
        value={remarriageIntentValue}
        error={state?.errors?.remarriage_intent}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
