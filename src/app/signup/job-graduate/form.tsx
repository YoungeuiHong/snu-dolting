"use client";
import React from "react";
import {
  container,
  contentContainer,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { updateJobAndGraduate } from "@/app/signup/job-graduate/action";
import { BinaryChoice, SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { booleanToString } from "@/utils/type/converts";

interface Props {
  initialJob: string | null;
  initialGraduate: boolean | null;
}

export default function Form({ initialJob, initialGraduate }: Props) {
  const { state, formAction, pending } = useSignupForm(updateJobAndGraduate, {
    job: initialJob,
    is_snu_graduate: initialGraduate,
  });

  const graduateValue = booleanToString(state?.user?.is_snu_graduate);

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>본교 졸업 여부와 직업을 알려주세요</p>
        </div>
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
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
