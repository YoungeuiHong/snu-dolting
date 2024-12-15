import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSignupStore } from "@/store/signup";

export function useStepNavigator(success: boolean | undefined) {
  const router = useRouter();
  const pathname = usePathname();
  const { handleNext, updateStepByPath } = useSignupStore();

  useEffect(() => {
    if (pathname) {
      updateStepByPath(pathname);
    }
  }, [pathname, updateStepByPath]);

  useEffect(() => {
    if (success) {
      const nextPath = handleNext();
      router.push(nextPath);
    }
  }, [success, handleNext, router]);
}
