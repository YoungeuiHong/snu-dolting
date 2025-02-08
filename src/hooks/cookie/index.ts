"use client";
import { useState, useEffect } from "react";

const getCookieValue = (cookieName: string): string | null => {
  const cookies = document.cookie.split("; ").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies[cookieName] || null;
};

export const useCookie = (cookieName: string): string | null => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setCookieValue(getCookieValue(cookieName));
    }
  }, [cookieName]);

  return cookieValue;
};
