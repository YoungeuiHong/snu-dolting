import React from "react";
import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function PhotoExchangePage() {
  const { photo_exchange_intent } = await getUserInfo([
    "photo_exchange_intent",
  ]);

  return <Form initialPhoto={photo_exchange_intent} />;
}
