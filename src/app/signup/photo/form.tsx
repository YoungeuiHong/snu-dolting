"use client";
import {
  container,
  contentContainer,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { BinaryChoice, SubmitButton } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { booleanToString } from "@/utils/type/converts";
import { updatePhotoExchange } from "@/app/signup/photo/action";

interface Props {
  initialPhoto: boolean | null;
}

export default function Form({ initialPhoto }: Props) {
  const { state, formAction, pending } = useSignupForm(updatePhotoExchange, {
    photo_exchange_intent: initialPhoto,
  });

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>사진 교환을 희망하시나요?</p>
        </div>
        <BinaryChoice
          name="photo_exchange_intent"
          label="사진 교환"
          options={[
            { value: "false", label: "아니요" },
            { value: "true", label: "예" },
          ]}
          value={booleanToString(state?.user?.photo_exchange_intent)}
          error={state?.errors?.photo_exchange_intent}
        />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
