"use client";
import React from "react";
import { container, title } from "@/app/signup/form.css";
import { updateJob } from "@/app/signup/job/action";
import { SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

export default function Job() {
  const { state, formAction, pending } = useSignupForm(updateJob);

  return (
    <form action={formAction} className={container}>
      <p className={title}>직업을 입력해주세요</p>
      <TextField
        name="job"
        label="직업"
        placeholder="직업을 입력해주세요 (예: 개발자)"
        error={state?.errors?.job}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
