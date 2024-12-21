"use client";
import React from "react";
import { container, title } from "@/app/signup/form.css";
import { updateJobAndGraduate } from "@/app/signup/job-graduate/action";
import { BinaryChoice, SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

interface Props {
  initialJob: string | null;
  initialGraduate: boolean | null;
}

export default function JobGraduateForm({
  initialJob,
  initialGraduate,
}: Props) {
  const { state, formAction, pending } = useSignupForm(updateJobAndGraduate, {
    job: initialJob,
    is_snu_graduate: initialGraduate,
  });

  const graduateValue =
    state?.user?.is_snu_graduate === true
      ? "true"
      : initialGraduate === false
        ? "false"
        : null;

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
        value={graduateValue}
        error={state?.errors?.is_snu_graduate}
      />
      <TextField
        name="job"
        label="직업"
        placeholder="직업을 입력해주세요 (예: 개발자)"
        value={state?.user?.job}
        error={state?.errors?.job}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
