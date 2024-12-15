import { useActionState } from "react";
import { useStepNavigator } from "@/app/signup/hooks";
import { SignUpActionResponse } from "@/app/signup/actions";

export function useSignupForm(
  action: (
    prevState: Awaited<SignUpActionResponse>,
    formData: FormData,
  ) => Promise<SignUpActionResponse>,
) {
  const [state, formAction, pending] = useActionState<
    SignUpActionResponse,
    FormData
  >(action, {
    errors: {},
    success: false,
  });

  useStepNavigator(state?.success);

  return { state, formAction, pending };
}
