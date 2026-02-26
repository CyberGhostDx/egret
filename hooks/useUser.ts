import useSWR from "swr";
import axiosInstance from "@/lib/axiosInstance";
import { userDashboardSchema } from "@/schema/backend.schema";
import { AxiosError } from "axios";
import { toast } from "@heroui/react";
import { useMemo } from "react";

export function useUser() {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR("/api/users/me");

  const user = useMemo(() => {
    return data ? userDashboardSchema.parse(data) : null;
  }, [data]);

  const enrollCourse = async (offeringId: string) => {
    try {
      await axiosInstance.post("/api/users/enroll", { offeringId });
      toast.success("Course added successfully.");

      await mutate();
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.error?.code === "COURSE_ALREADY_ENROLLED") {
          toast.danger("You have already enrolled in this course.");
          return false;
        } else if (err.response?.data?.error?.code === "COURSE_NOT_FOUND") {
          toast.danger("Course not found.");
          return false;
        }
      }
      toast.danger("Failed to add course.");
      return false;
    }
  };

  const unenrollCourse = async (offeringId: string) => {
    try {
      await axiosInstance.delete(`/api/users/enroll/${offeringId}`);
      toast.success("Unenrolled successfully.");

      await mutate();
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.error?.code === "COURSE_ALREADY_ENROLLED") {
          toast.danger("You have already enrolled in this course.");
          return false;
        } else if (err.response?.data?.error?.code === "COURSE_NOT_FOUND") {
          toast.danger("Course not found.");
          return false;
        }
      }
      toast.danger("Failed to unenroll.");
      return false;
    }
  };

  return {
    user,
    isLoading: isLoading || (!user && !error),
    isError: !!error,
    isValidating,
    enrollCourse,
    unenrollCourse,
  };
}
