"use client";
import { useState } from "react";
import {
  container,
  contentContainer,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { BinaryChoice, SubmitButton } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateChildren } from "@/app/signup/children/action";
import { booleanToString } from "@/utils/type/converts";

interface Props {
  initialHasChildren: boolean | null;
}

export default function Form({ initialHasChildren }: Props) {
  const { state, formAction, pending } = useSignupForm(updateChildren, {
    has_children: initialHasChildren,
  });

  const [hasChildren, setHasChildren] = useState<string | null>(
    booleanToString(state?.user?.has_children),
  );

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>자녀가 있으신가요?</p>
        </div>
        <BinaryChoice
          name="has_children"
          label="자녀 유무"
          options={[
            { value: "false", label: "없음" },
            { value: "true", label: "있음" },
          ]}
          value={hasChildren}
          error={state?.errors?.has_children}
          onChange={(value) => setHasChildren(value)}
        />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
