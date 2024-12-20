"use client";
import { updateNickname } from "@/app/signup/nickname/action";
import { container, title } from "@/app/signup/form.css";
import { SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

export default function NicknameForm({
  initialNickname,
}: {
  initialNickname: string | null;
}) {
  const {
    state: { user, errors },
    formAction,
    pending,
  } = useSignupForm(updateNickname, { nickname: initialNickname });

  return (
    <form action={formAction} className={container}>
      <p className={title}>닉네임을 입력해주세요</p>
      <TextField
        name="nickname"
        label="닉네임"
        placeholder="닉네임 (2~15글자)"
        value={user?.nickname}
        error={errors?.nickname}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
