"use client";
import React from "react";
import { container, title } from "@/app/signup/form.css";
import { updateJobAndGraduate } from "@/app/signup/jobGraduate/action";
import { BinaryChoice, SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

export default function JobAndGraduate() {
  const { state, formAction, pending } = useSignupForm(updateJobAndGraduate);

  return (
    <form action={formAction} className={container}>
      <p className={title}>본교 졸업 여부와 직업을 알려주세요</p>
      <BinaryChoice
        name="is_snu_graduate"
        label="본교 졸업 여부"
        options={[
          { value: "false", label: "타대" },
          { value: "true", label: "자대" },
        ]}
        error={state?.errors?.isSnuGraduate}
      />
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
