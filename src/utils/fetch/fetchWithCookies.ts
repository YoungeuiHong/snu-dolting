'use server'
import { cookies } from "next/headers";

export const fetchWithCookies = async (
  url: string,
  options: RequestInit = {},
) => {
  const cookieStore = await cookies();

  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const headers = {
    ...(options.headers || {}),
    Cookie: cookieHeader,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

