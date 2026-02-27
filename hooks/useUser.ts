import useSWR from "swr";
import axiosInstance from "@/lib/axiosInstance";
import { userDashboardSchema } from "@/schema/backend.schema";
import { AxiosError } from "axios";
import { toast } from "@heroui/react";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export function useUser() {
  const t = useTranslations("Toast");
  const { data, error, isLoading, isValidating, mutate } =
    useSWR("/api/users/me");

  const user = useMemo(() => {
    return data ? userDashboardSchema.parse(data) : null;
  }, [data]);

  const enrollCourse = async (offeringId: string) => {
    try {
      await axiosInstance.post("/api/users/enroll", { offeringId });
      toast.success(t("CourseAdded"));

      await mutate();
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.error?.code === "COURSE_ALREADY_ENROLLED") {
          toast.danger(t("AlreadyEnrolled"));
          return false;
        } else if (err.response?.data?.error?.code === "COURSE_NOT_FOUND") {
          toast.danger(t("CourseNotFound"));
          return false;
        }
      }
      toast.danger(t("FailedToAdd"));
      return false;
    }
  };

  const unenrollCourse = async (offeringId: string) => {
    try {
      await axiosInstance.delete(`/api/users/enroll/${offeringId}`);
      toast.success(t("Unenrolled"));

      await mutate();
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.error?.code === "COURSE_ALREADY_ENROLLED") {
          toast.danger(t("AlreadyEnrolled"));
          return false;
        } else if (err.response?.data?.error?.code === "COURSE_NOT_FOUND") {
          toast.danger(t("CourseNotFound"));
          return false;
        }
      }
      toast.danger(t("FailedToUnenroll"));
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
