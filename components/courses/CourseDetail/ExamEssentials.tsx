"use client"

import { Card } from "@heroui/react"
import { getDifficultyColor } from "@/lib/difficulty-utils"

interface ExamEssentialsProps {
  courseId: string
  title: string
  difficulty: number
}

export const ExamEssentials = ({ courseId, title, difficulty }: ExamEssentialsProps) => {
  const activeColor = getDifficultyColor(Math.round(difficulty));

  return (
    <Card className="p-8 shadow-sm border-none rounded-3xl mt-4 bg-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-[#194b59]">{courseId}</h1>
        <h2 className="text-xl font-bold text-[#2e6d7d] uppercase leading-tight max-w-[80%]">
          {title}
        </h2>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#2e6d7d]">DIFFICULTY</span>
            <span className="font-bold text-[#2e6d7d]">{Math.round(difficulty)}/5</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`size-5 rounded-full transition-colors duration-200 ${level <= Math.round(difficulty) ? activeColor : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
