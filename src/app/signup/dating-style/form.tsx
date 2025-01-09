"use client";
import {
  container,
  contentContainer,
  subtitle,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { SubmitButton, TextArea } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateDatingStyle } from "@/app/signup/dating-style/action";

export default function Form({
  initialDatingStyle,
}: {
  initialDatingStyle: string | null;
}) {
  const {
    state: { user, errors },
    formAction,
    pending,
  } = useSignupForm(updateDatingStyle, {
    dating_style: initialDatingStyle,
  });

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>어떤 연애를 하고 싶으신가요?</p>
          <p className={subtitle}>
            만남의 빈도 등 추구하는 연애 스타일에 대해 알려주세요.
          </p>
        </div>
        <TextArea
          name="dating_style"
          label="연애 스타일"
          placeholder="최소 20자 이상 적어주세요"
          value={user?.dating_style}
          error={errors?.dating_style}
        />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
