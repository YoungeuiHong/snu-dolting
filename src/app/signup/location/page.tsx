"use client";
import { SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateLocation } from "@/app/signup/location/action";
import { container, title } from "@/app/signup/form.css";

export default function Location() {
  const { state, formAction, pending } = useSignupForm(updateLocation);

  return (
    <form action={formAction} className={container}>
      <p className={title}>현재 거주지를 알려주세요</p>
      <TextField
        name="location"
        label="거주지"
        placeholder="ex. 서울 강동구 / 미국 보스턴"
        error={state?.errors?.location}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
