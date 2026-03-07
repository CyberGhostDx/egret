"use client";

import useSWR from "swr";
import { z } from "zod";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@heroui/react";
import { useMemo } from "react";
import {
  coursesOfferingsResponseSchema,
  reviewCourseSchema,
} from "@/schema/backend.schema";

export type AdminReviewCourse = z.infer<typeof reviewCourseSchema>;
export type AdminReview = AdminReviewCourse["reviews"][0];

const adminReviewsResponseSchema = z.array(reviewCourseSchema);

export function useAdminReviews() {
  // 1. Fetch all courses (reliable base list)
  const { data: coursesData, isLoading: isCoursesLoading } = useSWR(
    "/api/courses/offerings",
    { revalidateOnFocus: false },
  );

  // 2. Fetch specific review metrics from admin endpoint
  const {
    data: adminReviewsData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/api/admin/reviews", { revalidateOnFocus: false });

  // 3. Merge data to ensure we show all courses even if they have 0 reviews
  const coursesWithReviews = useMemo((): AdminReviewCourse[] => {
    // Parse all courses
    let baseCourses: z.infer<typeof coursesOfferingsResponseSchema> = [];
    try {
      baseCourses = coursesData
        ? coursesOfferingsResponseSchema.parse(coursesData)
        : [];
    } catch (err) {
      baseCourses = Array.isArray(coursesData) ? coursesData : [];
    }

    // Parse review data
    let reviewData: AdminReviewCourse[] = [];
    try {
      reviewData = adminReviewsData
        ? adminReviewsResponseSchema.parse(adminReviewsData)
        : [];
    } catch (err) {
      reviewData = Array.isArray(adminReviewsData) ? adminReviewsData : [];
    }

    // Merge: Map through base courses and add review details if found
    return baseCourses.map((course) => {
      const reviewsForCourse = reviewData.find((r) => r.id === course.id);
      return {
        ...course,
        reviews: reviewsForCourse?.reviews || [],
        // Ensure difficulty is synced or used from base
        difficulty:
          reviewsForCourse?.difficulty ?? (course as any).difficulty ?? 0,
      };
    }) as AdminReviewCourse[];
  }, [coursesData, adminReviewsData]);

  const deleteReview = async (
    courseId: string,
    reviewId: string,
  ): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/api/admin/reviews/${reviewId}`);
      toast.success("Review deleted successfully");
      await mutate(); // Refresh the reviews list
      return true;
    } catch (err) {
      toast.danger("Failed to delete review");
      return false;
    }
  };

  return {
    coursesWithReviews,
    isLoading:
      isCoursesLoading ||
      isLoading ||
      (!adminReviewsData && !error && isValidating),
    isError: error,
    deleteReview,
    mutate,
  };
}
