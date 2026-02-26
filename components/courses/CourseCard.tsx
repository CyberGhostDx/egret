import { memo, useState } from "react";
import { Tooltip, Modal, Button, useOverlayState } from "@heroui/react";
import { CoursesResponse } from "@/schema/backend.schema";
import { LuPlus } from "react-icons/lu";
import { useUser } from "@/hooks/useUser";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

interface CourseCardProps {
  course: CoursesResponse[0];
  difficulty: number;
}

import { getDifficultyColor } from "@/lib/difficulty-utils";

const CourseCard = memo(({
  course,
  difficulty,
}: CourseCardProps) => {
  const t = useTranslations("Courses");
  const activeColor = getDifficultyColor(difficulty);
  const modalState = useOverlayState();
  const [isLoading, setIsLoading] = useState(false);
  const { user, enrollCourse } = useUser();
  const userCourses = user?.userCourses;
  const locale = useLocale();

  const handleEnroll = async (offeringId: string) => {
    setIsLoading(true);
    const success = await enrollCourse(offeringId);
    if (success) {
      modalState.close();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Link href={`/courses/${course.id}`} className="bg-white border-2 border-primary rounded-xl p-5 flex flex-col justify-between min-h-[160px] relative">
        <div>
          <h3 className="text-xl font-extrabold text-primary mb-1">
            {course.id}
          </h3>
          <p className="text-lg font-semibold text-primary/80 line-clamp-2">
            {locale === "en" ? course.titleEn || course.titleTh : course.titleTh || course.titleEn}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="font-bold text-primary">{t("Difficulty")}:</span>
          <div className="flex gap-1.5 items-center">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-full ${level <= difficulty ? activeColor : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        <Tooltip delay={0}>
          <Tooltip.Trigger className="absolute bottom-4 right-4 z-40">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                modalState.open();
              }}
              className=" text-primary border border-primary rounded-full p-0.5 hover:bg-primary/10 transition-colors hover:cursor-pointer"
            >
              <LuPlus className="w-4 h-4" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow offset={10}>
            <p>{t("AddCourse")}</p>
          </Tooltip.Content>
        </Tooltip>
      </Link>

      <Modal>
        <Modal.Backdrop variant="blur" isOpen={modalState.isOpen} onOpenChange={modalState.setOpen}>
          <Modal.Container>
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-bold text-primary">{t("SelectOffering")}</h3>
                      <p className="text-sm font-medium text-gray-500">{course.id} - {locale === "en" ? course.titleEn || course.titleTh : course.titleTh || course.titleEn}</p>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="flex flex-col gap-3">
                      {course.offerings.map((offering) => {
                        const isEnrolled = userCourses?.some(
                          (uc) => uc.offering.id === offering.id
                        );

                        return (
                          <div
                            key={offering.id}
                            className={`border-2 rounded-xl p-4 flex justify-between items-center transition-all group ${isEnrolled
                              ? "border-success-soft-hover bg-success/5"
                              : "border-primary/10 hover:border-primary/40"
                              }`}
                          >
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-primary">
                                {t("Section")} {offering.section}
                              </span>
                              <span className="text-sm text-gray-500">
                                {locale === "en"
                                  ? offering.instructorEn || offering.instructorTh || t("NoInstructor")
                                  : offering.instructorTh || offering.instructorEn || t("NoInstructor")}
                              </span>
                              <span className="text-xs text-primary/60 font-medium">
                                {offering.credits} {t("Credits")} •{" "}
                                {offering.sectionType || "Standard"}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant={isEnrolled ? "primary" : "secondary"}
                              onPress={() => !isEnrolled && handleEnroll(offering.id)}
                              isPending={isLoading}
                              isDisabled={isEnrolled}
                              className="font-bold"
                            >
                              {isEnrolled ? t("Enrolled") : t("Select")}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="tertiary" onPress={close}>
                      {t("Cancel")}
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>

  );
});

export default CourseCard;
