"use client";
import React from "react";
import {
  container,
  contentContainer,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { SubmitButton } from "@/app/signup/components";
import { Select } from "@/app/signup/components/Select";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateMbti } from "@/app/signup/mbti/action";

const options = [
  { value: "ISTJ", label: "ISTJ" },
  { value: "ISFJ", label: "ISFJ" },
  { value: "INFJ", label: "INFJ" },
  { value: "INTJ", label: "INTJ" },
  { value: "ISTP", label: "ISTP" },
  { value: "ISFP", label: "ISFP" },
  { value: "INFP", label: "INFP" },
  { value: "INTP", label: "INTP" },
  { value: "ESTP", label: "ESTP" },
  { value: "ESFP", label: "ESFP" },
  { value: "ENFP", label: "ENFP" },
  { value: "ENTP", label: "ENTP" },
  { value: "ESTJ", label: "ESTJ" },
  { value: "ESFJ", label: "ESFJ" },
  { value: "ENFJ", label: "ENFJ" },
  { value: "ENTJ", label: "ENTJ" },
  { value: "MBTI 모름", label: "MBTI 모름" },
];

interface Props {
  initialMbti: string | null;
}

export default function Form({ initialMbti }: Props) {
  const { state, formAction, pending } = useSignupForm(updateMbti, {
    mbti: initialMbti,
  });

  const defaultOption = options.find(
    (option) => option.value === state?.user?.mbti,
  );

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>MBTI를 선택해주세요</p>
        </div>
        <Select
          name="mbti"
          label="MBTI"
          options={options}
          defaultValue={defaultOption}
          placeholder="MBTI를 선택해주세요."
          error={state?.errors?.mbti}
        />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
