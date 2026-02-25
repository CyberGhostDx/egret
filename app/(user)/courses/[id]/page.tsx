"use client"
import { useParams, useRouter } from 'next/navigation'
import { Button, Select, ListBox } from "@heroui/react"
import { IoIosArrowBack } from "react-icons/io"
import { useState } from 'react'
import { ExamEssentials } from '@/components/courses/CourseDetail/ExamEssentials'
import { AddReviewForm } from '@/components/courses/CourseDetail/AddReviewForm'
import { ReviewItem } from '@/components/courses/CourseDetail/ReviewItem'

const mockReviews = [
  { id: 1, name: 'Jirattakan JUNHOR', text: 'ยากจัด เว่อๆๆๆ 1-1 RoV @&@&@&@&@&@&@&', rating: 4, upvotes: 22, timestamp: '2 ชั่วโมงที่แล้ว' },
  { id: 2, name: 'Jirattakan JUNHOR', text: 'ยากจัด เว่อๆๆๆ 1-1 RoV @&@&@&@&@&@&@&', rating: 4, upvotes: 21, timestamp: '5 ชั่วโมงที่แล้ว' },
]

const mockCourseData = {
  title: "DISCRETE MATHEMATICS AND THEORY OF COMPUTATION",
  intensity: "3.5/5",
  note: "โน้ตย่อ A4 ลายมือตนเอง จำนวน 1 แผ่น 2 หน้า อนุญาต เครื่องคิดเลข P ไม่ต้อง Reset เครื่อง อนุญาต เครื่องคิดเลข NP ไม่ต้อง Reset เครื่อง พจนานุกรมอังกฤษ-ไทย 1 เล่ม"
}

export default function CoursePage() {
  const { id } = useParams()
  const router = useRouter()
  const [sortKey, setSortKey] = useState("intensity")

  return (
    <div className="w-full min-h-screen primary-bg bg-fixed flex justify-center py-10 px-4 md:px-8">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="flex flex-col gap-6">
          <Button
            className="w-fit bg-white/80 backdrop-blur-md text-primary font-semibold shadow-sm border border-primary/20 hover:bg-white"
            onPress={() => router.push('/courses')}
          >
            <IoIosArrowBack />
            Back to Courses
          </Button>

          <h2 className="text-3xl font-bold text-primary mt-2">Exam Essentials</h2>

          <ExamEssentials
            courseId={id as string}
            title={mockCourseData.title}
            intensity={mockCourseData.intensity}
            note={mockCourseData.note}
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-[#2e6d7d] lg:mt-18">Review</h2>

          <AddReviewForm />

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-[#2e6d7d]">Student Review</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 min-w-fit">sort by :</span>
                <Select
                  value={sortKey}
                  onChange={(key) => setSortKey(key as string)}
                  aria-label="Sort reviews"
                >
                  <Select.Trigger className="w-32 rounded-full bg-[#c9e0e5] shadow-none hover:bg-[#b6d0d4] text-[#2e6d7d] font-semibold flex items-center justify-between px-4 h-9">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="intensity" textValue="Intensity">Intensity</ListBox.Item>
                      <ListBox.Item id="recent" textValue="Recent">Recent</ListBox.Item>
                      <ListBox.Item id="upvotes" textValue="Upvotes">Upvotes</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {mockReviews.map((review) => (
              <ReviewItem
                key={review.id}
                name={review.name}
                text={review.text}
                rating={review.rating}
                upvotes={review.upvotes}
                timestamp={review.timestamp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}