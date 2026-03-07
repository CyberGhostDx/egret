"use client";

import { courseOfferingSchema } from "@/schema/backend.schema";
import { z } from "zod";
import { useMemo } from "react";
import useSWR from "swr";

export function useAdminExams() {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/admin/courses/offerings",
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const exams = useMemo(() => {
    return data ? z.array(courseOfferingSchema).parse(data) : null;
  }, [data]);

  return {
    exams,
    isLoading,
    isError: error,
    mutate,
  };
}
