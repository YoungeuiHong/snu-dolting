import { redirect } from "next/navigation";

/**
 * 기본 정보
 * - 닉네임
 * - 출생년도 / 성별
 * - 종교
 * - 직업 / 타대 여부
 * - 사는 지역
 *
 * 외향적 특징
 * - 키 / 몸무게
 * - 내 외모에 대한 설명
 *
 * 내면 설명
 * - mbti
 * - 내 성격에 대한 설명
 *
 * 연애관
 * - 내가 원하는 연애 스타일
 * - 나의 이상형
 *
 * 부가 정보
 * - 재혼 희망 여부
 * - 자녀 유뮤 / 딸, 아들 몇 명
 * - 사진 교환 희망 여부
 */

export enum Step {
  Home = "Home",
  Nickname = "Nickname",
  Profile = "Profile",
  BirthdayGender = "BirthdayGender",
  Religion = "Religion",
  Mbti = "Mbti",
  JobGraduate = "JobGraduate",
  Location = "Location",
  Body = "Body",
  Personality = "Personality",
  IdealType = "IdealType",
  Remarriage = "Remarriage",
  Children = "Children",
  Photo = "Photo",
  Done = "Done",
}

const STEP_PATHS: Record<Step, string> = {
  [Step.Home]: "/",
  [Step.Nickname]: "/signup/nickname",
  [Step.Profile]: "/signup/profile-picture",
  [Step.BirthdayGender]: "/signup/birthday-gender",
  [Step.Religion]: "/signup/religion",
  [Step.Mbti]: "/signup/mbti",
  [Step.JobGraduate]: "/signup/job-graduate",
  [Step.Location]: "/signup/location",
  [Step.Body]: "/signup/body-profile",
  [Step.Photo]: "/signup/photo",
  [Step.Personality]: "/signup/personality",
  [Step.IdealType]: "/signup/ideal-type",
  [Step.Remarriage]: "/signup/remarriage",
  [Step.Children]: "/signup/children",
  [Step.Done]: "/signup-done",
};

function getAdjacentStepPath(
  currentStep: Step,
  direction: "next" | "prev",
): string | null {
  const steps = Object.keys(STEP_PATHS) as Step[];
  const currentIndex = steps.indexOf(currentStep);

  if (currentIndex === -1) {
    return null;
  }

  const adjacentIndex =
    direction === "next" ? currentIndex + 1 : currentIndex - 1;

  if (adjacentIndex < 0 || adjacentIndex >= steps.length) {
    return null;
  }

  return STEP_PATHS[steps[adjacentIndex]];
}

export function moveToNextStepPath(currentStep: Step) {
  const nextPath = getAdjacentStepPath(currentStep, "next") || "/";
  redirect(nextPath);
}

export function moveToPrevStepPath(currentStep: Step) {
  const prevPath = getAdjacentStepPath(currentStep, "prev") || "/";
  redirect(prevPath);
}

export function getStepByPath(path: string) {
  const steps = Object.entries(STEP_PATHS) as [Step, string][];
  const stepEntry = steps.find(([, stepPath]) => stepPath === path);
  return stepEntry ? stepEntry[0] : null;
}

export function moveToPrevUrl(currentUrl: string) {
  const currentStep = getStepByPath(currentUrl);

  if (!currentStep) {
    console.error("Invalid URL: No step matches the current URL:", currentUrl);
    return null;
  }

  moveToPrevStepPath(currentStep);
}
