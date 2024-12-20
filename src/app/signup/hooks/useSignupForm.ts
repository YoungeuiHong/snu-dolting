import { useActionState } from "react";
import { SignUpActionResponse } from "@/app/signup/actions";
import { User } from "@/types/user";

interface UseSignupFormResponse {
  state: SignUpActionResponse;
  formAction: (payload: FormData) => void;
  pending: boolean;
}

export function useSignupForm(
  action: (
    prevState: Awaited<SignUpActionResponse | undefined>,
    formData: FormData,
  ) => Promise<SignUpActionResponse | void>,
  initialUser: Partial<User>,
): UseSignupFormResponse {
  const [state, formAction, pending] = useActionState<
    SignUpActionResponse,
    FormData
  >(
    async (prevState, formData) => {
      const result = await action(prevState, formData);

      if (!result) {
        return {
          user: initialUser,
          errors: {},
          success: false,
        };
      }

      return result;
    },
    {
      user: initialUser,
      errors: {},
      success: false,
    },
  );

  return { state, formAction, pending };
}
