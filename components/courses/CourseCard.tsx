import { Tooltip } from "@heroui/react";
import { CoursesResponse } from "@/schema/backend.schema";
import { LuPlus } from "react-icons/lu";
import axiosInstance from "@/lib/axiosInstance";

interface CourseCardProps {
  course: CoursesResponse[0];
  difficulty?: number;
}

const getDifficultyColor = (level: number) => {
  if (level <= 2) return "bg-[#8ce99a]";
  if (level === 3) return "bg-[#fcc419]";
  if (level === 4) return "bg-[#ff922b]";
  return "bg-[#fa5252]";
};

export default function CourseCard({
  course,
  difficulty = 3,
}: CourseCardProps) {
  const activeColor = getDifficultyColor(difficulty);

  const handleAddCourse = () => {
    try {
      axiosInstance.post(`/api/users/enroll`);
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  return (
    <div className="bg-white border-2 border-primary rounded-xl p-5 flex flex-col justify-between min-h-[160px] relative">
      <div>
        <h3 className="text-xl font-extrabold text-primary mb-1">
          {course.id}
        </h3>
        <p className="text-lg font-semibold text-primary/80 line-clamp-2">
          {course.titleEn || course.titleTh}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <span className="text-xs font-bold text-primary">Difficulty:</span>
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
        <Tooltip.Trigger className="absolute bottom-4 right-4" >
          <button onClick={handleAddCourse} className=" text-primary border border-primary rounded-full p-0.5 hover:bg-primary/10 transition-colors hover:cursor-pointer">
            <LuPlus className="w-4 h-4" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow offset={10}>
          <p>Add to my courses</p>
        </Tooltip.Content>
      </Tooltip>
    </div >
  );
}
