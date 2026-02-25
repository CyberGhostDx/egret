"use client"

import { Card, Button, Avatar } from "@heroui/react"
import { FaArrowUp } from "react-icons/fa"

interface ReviewItemProps {
  name: string
  text: string
  rating: number
  upvotes: number
  timestamp: string
}

export const ReviewItem = ({ name, text, rating, upvotes, timestamp }: ReviewItemProps) => {
  return (
    <Card className="p-4 shadow-sm border-none rounded-xl bg-white">
      <Card.Header>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar color="accent" size="md">
              <Avatar.Fallback>{name.split(" ").map((n) => n[0]).join("").toUpperCase()}</Avatar.Fallback>
            </Avatar>
            <span className="font-bold text-[#194b59]">{name}</span>
          </div>
          <span className="text-gray-400 font-medium">{timestamp}</span>
        </div>
      </Card.Header>
      <div className="flex gap-3 justify-between w-full">
        <p className="text-secondary text-sm mt-1 mb-6">
          {text}
        </p>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center">
          <span className="text font-bold text-[#2e6d7d]">Intensity Rate</span>
          <div className="flex gap-1.5 ml-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`w-3.5 h-3.5 rounded-full ${star <= rating ? 'bg-secondary' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        </div>
        <Button
          size="sm"
          className="bg-secondary text-white rounded-full font-medium min-w-16 h-8 text-xs gap-1"
        >
          <FaArrowUp /> {upvotes}
        </Button>
      </div>
    </Card >
  )
}
