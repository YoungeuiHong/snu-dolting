"use client";
import React from "react";
import {
  container,
  contentContainer,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { updateReligion } from "@/app/signup/religion/action";
import { SubmitButton } from "@/app/signup/components";
import { Select } from "@/app/signup/components/Select";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

const options = [
  { value: "catholic", label: "천주교" },
  { value: "christianity", label: "기독교" },
  { value: "buddhism", label: "불교" },
  { value: "none", label: "무교" },
  { value: "etc", label: "기타" },
];

interface Props {
  initialReligion: string | null;
}

export default function Form({ initialReligion }: Props) {
  const { state, formAction, pending } = useSignupForm(updateReligion, {
    religion: initialReligion,
  });

  const defaultOption = options.find(
    (option) => option.value === state?.user?.religion,
  );

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>종교를 입력해주세요</p>
        </div>
        <Select
          name="religion"
          label="종교"
          options={options}
          defaultValue={defaultOption}
          placeholder="종교를 선택해주세요."
          error={state?.errors?.religion}
        />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
