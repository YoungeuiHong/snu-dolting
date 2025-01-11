"use client";
import { toast } from "sonner";

export const toastError = (e: unknown) => {
  if (e instanceof Error) {
    toast(e.message || "에러가 발생했습니다.");
  } else {
    toast("에러가 발생했습니다.");
  }
};
