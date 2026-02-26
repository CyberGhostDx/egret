import useSWR from "swr";
import { coursesOfferingsResponseSchema } from "@/schema/backend.schema";

export function useCourses() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/courses/offerings",
  );

  const courses = data ? coursesOfferingsResponseSchema.parse(data) : null;

  return {
    courses,
    isLoading: isLoading || (!courses && !error),
    isError: error,
    isValidating,
    mutate,
  };
}
