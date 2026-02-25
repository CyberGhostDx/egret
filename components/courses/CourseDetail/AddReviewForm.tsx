"use client"

import { Card, Input, Switch, Button } from "@heroui/react"
import { LuMessageCirclePlus } from 'react-icons/lu'
import { useState } from "react"

export const AddReviewForm = () => {
  const [difficulty, setDifficulty] = useState(0)
  const [isAnonymous, setIsAnonymous] = useState(false)


  return (
    <Card className="p-8 shadow-sm border-none rounded-3xl flex flex-col gap-6 bg-white">
      <h3 className="font-bold text-lg text-[#194b59]">Add a Review</h3>

      <Input
        placeholder="Add your review here"
        className="border-[#b6d0d4] bg-white border rounded-full px-4 py-2 w-full shadow-none"
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-[#2e6d7d]">Difficulty</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setDifficulty(star)}
                className={`w-5 h-5 rounded-full transition-all duration-200 hover:scale-125 hover:shadow-sm ${star <= difficulty ? 'bg-secondary' : 'bg-slate-200 hover:bg-slate-300'}`}
                aria-label={`Select difficulty ${star}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            isSelected={isAnonymous}
            onChange={setIsAnonymous}
            className="group-data-[selected=true]:bg-[#4a7c8c] scale-90"
          >
            <span className="text-sm font-medium ml-1">Anonymous</span>
          </Switch>
          <Button
            className="bg-primary text-white rounded-full font-medium px-6 hover:opacity-90 transition-opacity"
          >
            <LuMessageCirclePlus className="size-5 mr-1" />
            Post
          </Button>
        </div>
      </div>
    </Card>
  )
}
