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
import { updateIdealType } from "@/app/signup/ideal-type/action";

export default function Form({
  initialIdealType,
}: {
  initialIdealType: string | null;
}) {
  const {
    state: { user, errors },
    formAction,
    pending,
  } = useSignupForm(updateIdealType, {
    ideal_type: initialIdealType,
  });

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>어떤 분을 만나고 싶으신가요?</p>
          <p className={subtitle}>
            외모, 성격, 나이, 종교 등 상대에게 바라는 점을 알려주세요.
          </p>
        </div>
        <TextArea
          name="ideal_type"
          label="내가 만나고 싶은 사람"
          placeholder="최소 20자 이상 적어주세요"
          value={user?.ideal_type}
          error={errors?.ideal_type}
        />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
