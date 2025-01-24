import { fetchWithCookies } from "./fetchWithCookies";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.snu-dolting.com";

const isServer = typeof window === "undefined";

export const fetchByEnv = async (url: string, options: RequestInit = {}) => {
  return isServer
    ? fetchWithCookies(`${BASE_URL}${url}`, options)
    : fetch(`${BASE_URL}${url}`, options);
};
