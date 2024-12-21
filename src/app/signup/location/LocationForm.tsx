"use client";
import { SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateLocation } from "@/app/signup/location/action";
import { container, title, titleWrapper } from "@/app/signup/form.css";

interface Props {
  initialLocation: string | null;
}

export default function LocationForm({ initialLocation }: Props) {
  const { state, formAction, pending } = useSignupForm(updateLocation, {
    location: initialLocation,
  });

  return (
    <form action={formAction} className={container}>
      <div className={titleWrapper}>
        <p className={title}>현재 거주지를 알려주세요</p>
      </div>
      <TextField
        name="location"
        label="거주지"
        placeholder="ex. 서울 강동구 / 미국 보스턴"
        value={state?.user?.location}
        error={state?.errors?.location}
      />
      <SubmitButton pending={pending} />
    </form>
  );
}
