"use client"

import { Card } from "@heroui/react"
import { PiNotePencil } from "react-icons/pi"

interface ExamEssentialsProps {
  courseId: string
  title: string
  intensity: string
  note?: string
}

export const ExamEssentials = ({ courseId, title, intensity, note }: ExamEssentialsProps) => {
  return (
    <Card className="p-8 shadow-sm border-none rounded-3xl mt-4 bg-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-[#194b59]">{courseId}</h1>
        <h2 className="text-xl font-bold text-[#2e6d7d] uppercase leading-tight max-w-[80%]">
          {title}
        </h2>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-bold text-[#2e6d7d]">INTENSITY</span>
          <span className="font-bold text-[#2e6d7d]">{intensity}</span>
        </div>
      </div>

      <div className="mt-12">
        <span className="font-bold text-[#194b59] mb-2 block">NOTE</span>
        <div className="bg-[#eff5f5] rounded-xl p-5 border border-[#c3dcdd] flex gap-4 items-start">
          <PiNotePencil className="size-20 min-w-20 text-primary self-center" />
          <div className="">
            {note && (
              <p className="font-bold text-primary">{note}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
