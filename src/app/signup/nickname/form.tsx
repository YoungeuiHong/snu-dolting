"use client";
import { updateNickname } from "@/app/signup/nickname/action";
import {
  container,
  contentContainer,
  subtitle,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

export default function Form({
  initialNickname,
  initialIntroduction,
}: {
  initialNickname: string | null;
  initialIntroduction: string | null;
}) {
  const {
    state: { user, errors },
    formAction,
    pending,
  } = useSignupForm(updateNickname, {
    nickname: initialNickname,
    introduction: initialIntroduction,
  });

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>
            닉네임과 <br />한 줄 소개를 작성해주세요
          </p>
          <p className={subtitle}>
            나를 가장 잘 표현할 수 있는 문구를 적어주세요.
          </p>
        </div>
        <TextField
          name="nickname"
          label="닉네임 (2~10글자)"
          placeholder="ex. 샤붕이"
          value={user?.nickname}
          error={errors?.nickname}
        />
        <TextField
          name="introduction"
          label="자기소개 (5~20글자)"
          placeholder="ex. 소소한 연애를 꿈꾸는 내향인"
          value={user?.introduction}
          error={errors?.introduction}
        />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
