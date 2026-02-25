"use client"
import { useParams, useRouter } from 'next/navigation'
import { Button, Select, ListBox } from "@heroui/react"
import { IoIosArrowBack } from "react-icons/io"
import { useEffect, useState, useMemo } from 'react'
import { ExamEssentials } from '@/components/courses/CourseDetail/ExamEssentials'
import { AddReviewForm } from '@/components/courses/CourseDetail/AddReviewForm'
import { ReviewItem } from '@/components/courses/CourseDetail/ReviewItem'
import axiosInstance from '@/lib/axiosInstance'
import { ReviewCourseResponse } from '@/schema/backend.schema'

export default function CoursePage() {
  const [reviewCourse, setReviewCourse] = useState<ReviewCourseResponse>()
  const { id } = useParams()
  const router = useRouter()
  const [sortKey, setSortKey] = useState("difficulty")

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get(`/api/reviews/${id}`)
        setReviewCourse(response.data.data)
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
      }
    }
    if (id) fetchReview()
  }, [id])

  const sortedReviews = useMemo(() => {
    if (!reviewCourse?.reviews) return []

    const reviewsCopy = [...reviewCourse.reviews]

    return reviewsCopy.sort((a, b) => {
      if (sortKey === "difficulty") {
        return b.difficulty - a.difficulty
      }
      if (sortKey === "upvotes") {
        return b.vote - a.vote
      }
      if (sortKey === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return 0
    })
  }, [reviewCourse?.reviews, sortKey])

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date))
  }

  if (!reviewCourse) {
    return (
      <div className="w-full min-h-screen primary-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-primary">Loading course details...</p>
        </div>
      </div>
    )
  }

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
            courseId={reviewCourse.id}
            title={reviewCourse.titleEn || reviewCourse.titleTh}
            difficulty={reviewCourse.difficulty}
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
                      <ListBox.Item id="difficulty" textValue="Difficulty">Difficulty</ListBox.Item>
                      <ListBox.Item id="recent" textValue="Recent">Recent</ListBox.Item>
                      <ListBox.Item id="upvotes" textValue="Upvotes">Upvotes</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <ReviewItem
                  key={review._id}
                  name={review.username}
                  text={review.text}
                  rating={review.difficulty}
                  upvotes={review.vote}
                  timestamp={formatTimestamp(review.createdAt)}
                />
              ))
            ) : (
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-10 text-center flex flex-col items-center gap-3 border border-white/20">
                <p className="text-xl font-bold text-[#2e6d7d]">No reviews yet</p>
                <p className="text-gray-500">Be the first to share your thoughts on this course!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}