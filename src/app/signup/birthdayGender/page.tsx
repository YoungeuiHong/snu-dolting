"use client";
import React from "react";
import { container, title } from "@/app/signup/form.css";
import { updateBirthdayGender } from "@/app/signup/birthdayGender/action";
import { BinaryChoice, SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

export default function BirthdayGender() {
  const { state, formAction, pending } = useSignupForm(updateBirthdayGender);

  return (
    <form action={formAction} className={container}>
      <p className={title}>성별과 출생년도를 입력해주세요</p>
      <BinaryChoice
        name="gender"
        label="성별"
        options={[
          { value: "male", label: "남성" },
          { value: "female", label: "여성" },
        ]}
        error={state?.errors?.gender}
      />
      <TextField
        name="birth_year"
        label="출생년도"
        placeholder="출생년도 4자리를 작성해주세요 (예: 1990)"
        error={state?.errors?.birthYear}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
