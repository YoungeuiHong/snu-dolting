"use client";
import React from "react";
import { updateNickname } from "@/app/signup/nickname/action";
import { container, title } from "@/app/signup/form.css";
import { SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

export default function Nickname() {
  const { state, formAction, pending } = useSignupForm(updateNickname);

  return (
    <form action={formAction} className={container}>
      <p className={title}>닉네임을 입력해주세요</p>
      <TextField
        name="nickname"
        label="닉네임"
        placeholder="닉네임 (2~15글자)"
        error={state?.errors?.nickname}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
