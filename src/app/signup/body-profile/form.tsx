"use client";
import { container, title } from "@/app/signup/form.css";
import { SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateBodyProfile } from "@/app/signup/body-profile/action";

export default function Form({
  initialWeight,
  initialHeight,
}: {
  initialWeight: number | null;
  initialHeight: number | null;
}) {
  const {
    state: { user, errors },
    formAction,
    pending,
  } = useSignupForm(updateBodyProfile, {
    weight: initialWeight,
    height: initialHeight,
  });

  return (
    <form action={formAction} className={container}>
      <p className={title}>신체 정보를 알려주세요</p>
      <TextField
        name="height"
        label="키"
        placeholder="숫자만 입력해주세요"
        value={user?.height}
        error={errors?.height}
        type="number"
        unit="cm"
      />
      <TextField
        name="weight"
        label="몸무게"
        placeholder="숫자만 입력해주세요"
        value={user?.weight}
        error={errors?.weight}
        type="number"
        unit="kg"
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
