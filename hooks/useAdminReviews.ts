"use client";

import useSWR from "swr";
import { z } from "zod";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@heroui/react";
import { useMemo } from "react";

export const adminReviewSchema = z.object({
  _id: z.string(),
  username: z.string(),
  content: z.string(),
  difficulty: z.coerce.number(),
  status: z.enum(["published", "deleted"]).default("published"),
  vote: z.coerce.number().default(0),
  createdAt: z.coerce.date(),
});

export const adminReviewCourseSchema = z.object({
  id: z.string(),
  titleTh: z.string(),
  titleEn: z.string(),
  difficulty: z.coerce.number().default(0),
  reviews: z.array(adminReviewSchema),
});

export type AdminReviewCourse = z.infer<typeof adminReviewCourseSchema>;
export type AdminReview = z.infer<typeof adminReviewSchema>;

const adminReviewsResponseSchema = z.array(adminReviewCourseSchema);

export function useAdminReviews() {
  const {
    data: adminReviewsData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/api/admin/reviews", { revalidateOnFocus: false });

  const coursesWithReviews = useMemo((): AdminReviewCourse[] => {
    if (!adminReviewsData) return [];

    let reviewData: AdminReviewCourse[] = [];
    try {
      reviewData = adminReviewsResponseSchema.parse(adminReviewsData);
    } catch (err) {
      console.error("Schema validation failed for admin reviews:", err);
      reviewData = Array.isArray(adminReviewsData) ? adminReviewsData : [];
    }

    return reviewData.map((course) => ({
      ...course,
      reviews: course.reviews || [],
      difficulty: course.difficulty ?? 0,
    }));
  }, [adminReviewsData]);

  const deleteReview = async (reviewId: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/api/admin/reviews/${reviewId}`);
      toast.success("Review deleted successfully");
      await mutate();
      return true;
    } catch (err) {
      toast.danger("Failed to delete review");
      return false;
    }
  };

  return {
    coursesWithReviews,
    isLoading: isLoading || (!adminReviewsData && !error && isValidating),
    isError: error,
    deleteReview,
    mutate,
  };
}
