import { create } from "zustand";

interface SignupState {
  step: number;
  STEPS: { id: number; path: string }[];
  setStep: (step: number) => void;
  handlePrev: () => string;
  handleNext: () => string;
  updateStepByPath: (path: string) => void;
}

export const useSignupStore = create<SignupState>((set, get) => ({
  step: 1,
  STEPS: [
    { id: 0, path: "/" },
    { id: 1, path: "/signup/nickname" },
    { id: 2, path: "/signup/birthdayGender" },
    { id: 3, path: "/signup/religion" },
    { id: 4, path: "/signup/jobGraduate" },
  ],
  setStep: (step) => set({ step }),
  handlePrev: () => {
    const { step, setStep, STEPS } = get();
    const prevStep = Math.max(step - 1, 0);
    setStep(prevStep);
    return STEPS[prevStep].path;
  },
  handleNext: () => {
    const { step, setStep, STEPS } = get();
    const nextStep = Math.min(step + 1, STEPS.length - 1);
    setStep(nextStep);
    return STEPS[nextStep].path;
  },
  updateStepByPath: (path) => {
    const { STEPS, setStep } = get();
    const matchingStep = STEPS.find((step) => step.path === path);
    if (matchingStep) {
      setStep(matchingStep.id);
    }
  },
}));
