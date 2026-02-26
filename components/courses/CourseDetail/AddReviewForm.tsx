import { Card, Input, Switch, Button, toast } from "@heroui/react";
import { LuMessageCirclePlus } from "react-icons/lu";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { TbGhost, TbGhostOff } from "react-icons/tb";
import { getDifficultyColor } from "@/lib/difficulty-utils";
import { useTranslations } from "next-intl";

export const AddReviewForm = ({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: (newReview: any) => void;
}) => {
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations("CourseReview");

  const activeColor = getDifficultyColor(difficulty);

  const handleReviewSubmit = async () => {
    if (!content.trim()) {
      toast.danger("Please enter your review content.");
      return;
    }

    if (difficulty === 0) {
      toast.danger("Please select a difficulty level.");
      return;
    }

    setIsPending(true);
    try {
      const response = await axiosInstance.post(`/api/reviews/${id}`, {
        content: content.trim(),
        difficulty,
        isAnonymous,
      });

      if (response.data.data) {
        onSuccess(response.data.data);
      }

      toast.success("Your review has been posted successfully!");

      setContent("");
      setDifficulty(0);
      setIsAnonymous(false);
    } catch (error) {
      console.error("Failed to post review:", error);
      toast.danger("Failed to post review. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="flex flex-col gap-6 rounded-3xl border-none bg-white p-8 shadow-sm">
      <h3 className="text-lg font-bold text-[#194b59]">{t("AddReview")}</h3>

      <Input
        placeholder={t("AddReviewPlaceholder")}
        className="w-full rounded-full border border-[#b6d0d4] bg-white px-4 py-2 shadow-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleReviewSubmit();
          }
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-[#2e6d7d]">
            {t("DifficultyRate")}
          </span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setDifficulty(star)}
                className={`h-5 w-5 rounded-full transition-all duration-200 hover:scale-125 hover:shadow-sm ${star <= difficulty ? activeColor : "bg-slate-200 hover:bg-slate-300"}`}
                aria-label={`Select difficulty ${star}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            isSelected={isAnonymous}
            onChange={setIsAnonymous}
            className="scale-90 group-data-[selected=true]:bg-[#4a7c8c]"
            size="lg"
          >
            {({ isSelected }) => (
              <>
                <Switch.Control
                  className={isSelected ? "bg-blue-500 text-blue-500" : ""}
                >
                  <Switch.Thumb>
                    <Switch.Icon>
                      {isSelected ? <TbGhost /> : <TbGhostOff />}
                    </Switch.Icon>
                  </Switch.Thumb>
                </Switch.Control>
                <Switch.Content>
                  <span className="text ml-1 font-medium">
                    {t("Anonymous")}
                  </span>
                </Switch.Content>
              </>
            )}
          </Switch>
          <Button
            className="bg-primary rounded-full px-6 font-medium text-white transition-opacity hover:opacity-90"
            onPress={handleReviewSubmit}
            isPending={isPending}
          >
            <LuMessageCirclePlus className="mr-1 size-5" />
            {t("Post")}
          </Button>
        </div>
      </div>
    </Card>
  );
};
