import React from "react";
import JobGraduateForm from "@/app/signup/jobGraduate/JobGraduateForm";
import { getUserInfo } from "@/utils/user";

export default async function JobAndGraduate() {
  const { job, is_snu_graduate } = await getUserInfo([
    "job",
    "is_snu_graduate",
  ]);

  return <JobGraduateForm initialJob={job} initialGraduate={is_snu_graduate} />;
}
