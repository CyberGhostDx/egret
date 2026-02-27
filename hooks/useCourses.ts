import useSWR from "swr";
import { coursesOfferingsResponseSchema } from "@/schema/backend.schema";
import { useMemo } from "react";

export function useCourses() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/courses/offerings",
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const courses = useMemo(() => {
    return data ? coursesOfferingsResponseSchema.parse(data) : null;
  }, [data]);

  return {
    courses,
    isLoading: isLoading || (!courses && !error),
    isError: error,
    isValidating,
    mutate,
  };
}
