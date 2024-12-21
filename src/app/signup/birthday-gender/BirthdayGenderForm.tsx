"use client";
import React from "react";
import { container, title, titleWrapper } from "@/app/signup/form.css";
import { updateBirthdayGender } from "@/app/signup/birthday-gender/action";
import { BinaryChoice, SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { numToString } from "@/utils/type/numToString";

interface Props {
  initialGender: string | null;
  initialBirthYear: number | null;
}

export default function BirthdayGenderForm({
  initialGender,
  initialBirthYear,
}: Props) {
  const { state, formAction, pending } = useSignupForm(updateBirthdayGender, {
    gender: initialGender,
    birth_year: initialBirthYear,
  });

  return (
    <form action={formAction} className={container}>
      <div className={titleWrapper}>
        <p className={title}>성별과 출생년도를 입력해주세요</p>
      </div>
      <BinaryChoice
        name="gender"
        label="성별"
        options={[
          { value: "male", label: "남성" },
          { value: "female", label: "여성" },
        ]}
        value={state?.user?.gender}
        error={state?.errors?.gender}
      />
      <TextField
        name="birth_year"
        label="출생년도"
        placeholder="출생년도 4자리를 작성해주세요 (예: 1990)"
        value={numToString(state?.user?.birth_year)}
        error={state?.errors?.birth_year}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
