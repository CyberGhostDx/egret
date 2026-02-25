import { Card, Input, Switch, Button, toast } from "@heroui/react"
import { LuMessageCirclePlus } from 'react-icons/lu'
import { useState } from "react"
import axiosInstance from "@/lib/axiosInstance"
import { TbGhost, TbGhostOff } from "react-icons/tb"

export const AddReviewForm = ({ id }: { id: string }) => {
  const [content, setContent] = useState("")
  const [difficulty, setDifficulty] = useState(0)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleReviewSubmit = async () => {
    if (!content.trim()) {
      toast.danger("Please enter your review content.")
      return
    }

    if (difficulty === 0) {
      toast.danger("Please select a difficulty level.")
      return
    }

    setIsPending(true)
    try {
      await axiosInstance.post(`/api/reviews/${id}`, {
        content: content.trim(),
        difficulty,
        isAnonymous,
      })

      toast.success("Your review has been posted successfully!")

      setContent("")
      setDifficulty(0)
      setIsAnonymous(false)
    } catch (error) {
      console.error("Failed to post review:", error)
      toast.danger("Failed to post review. Please try again later.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="p-8 shadow-sm border-none rounded-3xl flex flex-col gap-6 bg-white">
      <h3 className="font-bold text-lg text-[#194b59]">Add a Review</h3>

      <Input
        placeholder="Add your review here"
        className="border-[#b6d0d4] bg-white border rounded-full px-4 py-2 w-full shadow-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleReviewSubmit()
          }
        }}
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
            size="lg"
          >
            {
              ({ isSelected }) => (
                <>
                  <Switch.Control className={isSelected ? 'bg-blue-500 text-blue-500' : ''}>

                    <Switch.Thumb>
                      <Switch.Icon>
                        {isSelected ? <TbGhost /> : <TbGhostOff />}
                      </Switch.Icon>
                    </Switch.Thumb>
                  </Switch.Control>
                  <Switch.Content>
                    <span className="text font-medium ml-1">Anonymous</span>
                  </Switch.Content>
                </>
              )
            }
          </Switch>
          <Button
            className="bg-primary text-white rounded-full font-medium px-6 hover:opacity-90 transition-opacity"
            onPress={handleReviewSubmit}
            isPending={isPending}
          >
            <LuMessageCirclePlus className="size-5 mr-1" />
            Post
          </Button>
        </div>
      </div>
    </Card>
  )
}
