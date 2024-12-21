"use client";
import { useState } from "react";
import {
  container,
  subtitle,
  title,
  titleWrapper,
} from "@/app/signup/form.css";
import { BinaryChoice, SubmitButton, TextField } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { updateChildren } from "@/app/signup/children/action";
import { booleanToString } from "@/utils/type/converts";

interface Props {
  initialHasChildren: boolean | null;
  initialHasCustody: boolean | null;
  initialSonCount: number | null;
  initialDaughterCount: number | null;
}

export default function Form({
  initialHasChildren,
  initialHasCustody,
  initialSonCount,
  initialDaughterCount,
}: Props) {
  const { state, formAction, pending } = useSignupForm(updateChildren, {
    has_children: initialHasChildren,
    has_custody: initialHasCustody,
    son_count: initialSonCount,
    daughter_count: initialDaughterCount,
  });

  const [hasChildren, setHasChildren] = useState<string | null>(
    booleanToString(state?.user?.has_children),
  );

  const hasCustody = booleanToString(state?.user?.has_custody);

  return (
    <form action={formAction} className={container}>
      <div className={titleWrapper}>
        <p className={title}>자녀가 있으신가요?</p>
        <p className={subtitle}>있으시다면 양육 여부와 자녀수를 알려주세요.</p>
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

      {hasChildren === "true" && (
        <>
          <BinaryChoice
            name="has_custody"
            label="자녀 양육 여부"
            options={[
              { value: "false", label: "비양육" },
              { value: "true", label: "양육" },
            ]}
            value={hasCustody}
            error={state?.errors?.has_custody}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              name="son_count"
              label="아들"
              placeholder=""
              value={state?.user?.son_count || 0}
              type="number"
              unit="명"
            />
            <TextField
              name="daughter_count"
              label="딸"
              placeholder=""
              value={state?.user?.daughter_count || 0}
              type="number"
              unit="명"
            />
          </div>
        </>
      )}
      <SubmitButton pending={pending} />
    </form>
  );
}
