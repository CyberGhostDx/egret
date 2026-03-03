"use client";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Button, Select, ListBox } from "@heroui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useMemo } from "react";
import { ExamEssentials } from "@/components/courses/CourseDetail/ExamEssentials";
import { AddReviewForm } from "@/components/courses/CourseDetail/AddReviewForm";
import { ReviewItem } from "@/components/courses/CourseDetail/ReviewItem";
import { ReviewCourseResponse } from "@/schema/backend.schema";
import useSWR from "swr";
import { useTranslations } from "next-intl";

export default function CoursePage() {
  const { id } = useParams();
  const { data: reviewCourse, mutate } = useSWR<ReviewCourseResponse>(
    id ? `/api/reviews/${id}` : null,
  );
  const router = useRouter();
  const [sortKey, setSortKey] = useState("recent");
  const t = useTranslations("CourseReview");

  const sortedReviews = useMemo(() => {
    if (!reviewCourse?.reviews) return [];

    const reviewsCopy = [...reviewCourse.reviews];

    return reviewsCopy.sort((a, b) => {
      if (sortKey === "difficulty") {
        return b.difficulty - a.difficulty;
      }
      if (sortKey === "recent") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });
  }, [reviewCourse?.reviews, sortKey]);

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Bangkok",
    }).format(new Date(date));
  };

  const handleAddReview = async () => {
    await mutate();
  };

  if (!reviewCourse) {
    return (
      <div className="primary-bg flex min-h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-primary text-xl font-semibold">
            {t("LoadingDetails")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="primary-bg flex min-h-screen w-full justify-center bg-fixed px-4 py-10 md:px-8">
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit">
          <Button
            className="text-primary border-primary/20 w-fit border bg-white/80 font-semibold shadow-sm backdrop-blur-md hover:bg-white"
            onPress={() => router.push("/courses")}
          >
            <IoIosArrowBack />
            {t("BackToCourses")}
          </Button>

          <h2 className="text-primary mt-2 text-3xl font-bold">
            {t("ExamEssentials")}
          </h2>

          <ExamEssentials
            courseId={reviewCourse.id}
            titleTh={reviewCourse.titleTh}
            titleEn={reviewCourse.titleEn}
            difficulty={reviewCourse.difficulty}
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-[#2e6d7d] lg:mt-18">
            {t("Review")}
          </h2>

          <AddReviewForm id={reviewCourse.id} onSuccess={handleAddReview} />

          <div className="mt-4 flex flex-col gap-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#2e6d7d]">
                {t("StudentReview")}
              </h3>
              <div className="flex items-center gap-2">
                <span className="min-w-fit text-sm text-gray-500">
                  {t("SortBy")}
                </span>
                <Select
                  value={sortKey}
                  onChange={(key) => setSortKey(key as string)}
                  aria-label="Sort reviews"
                >
                  <Select.Trigger className="flex h-9 w-32 items-center justify-between rounded-full bg-[#c9e0e5] px-4 font-semibold text-[#2e6d7d] shadow-none hover:bg-[#b6d0d4]">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="difficulty" textValue="Difficulty">
                        {t("DifficultyRate")}
                      </ListBox.Item>
                      <ListBox.Item id="recent" textValue="Recent">
                        {t("Recent")}
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <ReviewItem
                  id={review._id}
                  key={review._id}
                  name={review.username}
                  text={review.content}
                  rating={review.difficulty}
                  upvotes={review.vote}
                  timestamp={formatTimestamp(review.createdAt)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-white/50 p-10 text-center backdrop-blur-sm">
                <p className="text-xl font-bold text-[#2e6d7d]">
                  {t("NoReviewsYet")}
                </p>
                <p className="text-gray-500">{t("BeTheFirst")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
