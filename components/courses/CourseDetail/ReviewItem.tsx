"use client";

import { Card, Button, Avatar } from "@heroui/react";
import { FaArrowUp } from "react-icons/fa";
import axiosInstance from "@/lib/axiosInstance";
import { authClient } from "@/lib/auth-client";

import { getDifficultyColor } from "@/lib/difficulty-utils";
import { useTranslations } from "next-intl";

interface ReviewItemProps {
  id: string;
  name: string;
  text: string;
  rating: number;
  upvotes: number;
  timestamp: string;
}

export const ReviewItem = ({
  id,
  name,
  text,
  rating,
  upvotes,
  timestamp,
}: ReviewItemProps) => {
  const activeColor = getDifficultyColor(rating);
  const t = useTranslations("CourseReview");

  return (
    <Card className="rounded-xl border-none bg-white p-4 shadow-sm">
      <Card.Header>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar color="accent" size="md">
              <Avatar.Fallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
            <span className="font-bold text-[#194b59]">{name}</span>
          </div>
          <span className="font-medium text-gray-400">{timestamp}</span>
        </div>
      </Card.Header>
      <div className="flex w-full justify-between gap-3">
        <p className="text-secondary mt-1 mb-6 text-sm">{text}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text font-bold text-[#2e6d7d]">
            {t("DifficultyRate")}
          </span>
          <div className="ml-2 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`h-2.5 w-2.5 rounded-full ${star <= rating ? activeColor : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
        {/* <Button
          size="sm"
          className={` text-white rounded-full font-medium min-w-16 h-8 text-xs gap-1`}
          onClick={handleUpvote}
        >
          <FaArrowUp /> {upvotes}
        </Button> */}
      </div>
    </Card>
  );
};
