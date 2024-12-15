"use client";
import React from "react";
import { container, title } from "@/app/signup/form.css";
import { updateReligion } from "@/app/signup/religion/action";
import { SubmitButton } from "@/app/signup/components";
import { Select } from "@/app/signup/components/Select";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";

const options = [
  { value: "catholic", label: "천주교" },
  { value: "christianity", label: "기독교" },
  { value: "buddhism", label: "불교" },
  { value: "none", label: "무교" },
];

export default function Religion() {
  const { state, formAction, pending } = useSignupForm(updateReligion);

  return (
    <form action={formAction} className={container}>
      <p className={title}>종교를 입력해주세요</p>
      <Select
        name="religion"
        label="종교"
        options={options}
        placeholder="종교를 선택해주세요."
        error={state?.errors?.religion}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
