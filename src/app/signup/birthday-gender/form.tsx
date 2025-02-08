"use client";
import React from "react";
import {
  container,
  contentContainer,
  subtitle,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { updateBirthdayGender } from "@/app/signup/birthday-gender/action";
import { BinaryChoice, SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { numToString } from "@/utils/type/converts";
import { useCookie } from "@/hooks/cookie";

interface Props {
  initialGender: string | null;
  initialBirthYear: number | null;
}

export default function Form({ initialGender, initialBirthYear }: Props) {
  const { state, formAction, pending } = useSignupForm(updateBirthdayGender, {
    gender: initialGender,
    birth_year: initialBirthYear,
  });

  const isSignupDone = useCookie("complete");

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>
            {isSignupDone === "yes" && "출생년도를 입력해주세요"}
            {isSignupDone === "no" && "출생년도와 성별을 입력해주세요"}
            &nbsp;
          </p>
          {isSignupDone === "no" && (
            <p className={subtitle}>
              성별은 이후에 수정할 수 없으니 꼼꼼히 확인해주세요
            </p>
          )}
        </div>
        <TextField
          name="birth_year"
          label="출생년도"
          placeholder="출생년도 4자리를 작성해주세요 (예: 1990)"
          value={numToString(state?.user?.birth_year)}
          error={state?.errors?.birth_year}
        />
        {isSignupDone === "yes" && state?.user?.gender && (
          <input
            type="text"
            name="gender"
            value={state?.user?.gender}
            hidden
            readOnly
          />
        )}
        {isSignupDone === "no" && (
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
        )}
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
