"use client";
import {
  container,
  subtitle,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { SubmitButton, TextArea } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updatePersonality } from "@/app/signup/personality/action";

export default function Form({
  initialPersonality,
}: {
  initialPersonality: string | null;
}) {
  const {
    state: { user, errors },
    formAction,
    pending,
  } = useSignupForm(updatePersonality, {
    inner_description: initialPersonality,
  });

  return (
    <form action={formAction} className={container}>
      <div className={titleWrapper}>
        <p className={title}>나는 어떤 사람인가요?</p>
        <p className={subtitle}>MBTI, 성격, 취미, 가치관 등을 알려주세요.</p>
        <p className={subtitle}>
          주위 사람들이 이야기하는 나의 매력은 무엇인가요?
        </p>
      </div>
      <TextArea
        name="inner_description"
        label="나에 대한 설명"
        placeholder="최소 50자 이상 적어주세요"
        value={user?.inner_description}
        error={errors?.inner_description}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
