"use client";
import {
  container,
  subtitle,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { SubmitButton, TextArea } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateAppearance } from "@/app/signup/appearance/action";

export default function Form({
  initialAppearance,
}: {
  initialAppearance: string | null;
}) {
  const {
    state: { user, errors },
    formAction,
    pending,
  } = useSignupForm(updateAppearance, {
    appearance_description: initialAppearance,
  });

  return (
    <form action={formAction} className={container}>
      <div className={titleWrapper}>
        <p className={title}>나의 외모에 대한 설명을 적어주세요</p>
        <p className={subtitle}>
          주위 사람들이 이야기하는 내 외모의 매력은 무엇인가요?
        </p>
      </div>
      <TextArea
        name="appearance_description"
        label="나의 외모"
        placeholder="최소 20자 이상 적어주세요"
        value={user?.appearance_description}
        error={errors?.appearance_description}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
