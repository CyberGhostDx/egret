"use client"

import { Card } from "@heroui/react"
import { PiNotePencil } from "react-icons/pi"

interface ExamEssentialsProps {
  courseId: string
  title: string
  difficulty: string
}

export const ExamEssentials = ({ courseId, title, difficulty }: ExamEssentialsProps) => {
  return (
    <Card className="p-8 shadow-sm border-none rounded-3xl mt-4 bg-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-[#194b59]">{courseId}</h1>
        <h2 className="text-xl font-bold text-[#2e6d7d] uppercase leading-tight max-w-[80%]">
          {title}
        </h2>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-bold text-[#2e6d7d]">DIFFICULTY</span>
          <span className="font-bold text-[#2e6d7d]">{difficulty}</span>
        </div>
      </div>


    </Card>
  )
}
