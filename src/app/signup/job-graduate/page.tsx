import React from "react";
import Form from "@/app/signup/job-graduate/form";
import { getUserInfo } from "@/utils/user";

export default async function JobAndGraduate() {
  const { job, is_snu_graduate } = await getUserInfo([
    "job",
    "is_snu_graduate",
  ]);

  return <Form initialJob={job} initialGraduate={is_snu_graduate} />;
}
