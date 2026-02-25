"use client"
import { useParams } from 'next/navigation'

const CoursePage = () => {
  const { id } = useParams()
  return (
    <div>{id}</div>
  )
}

export default CoursePage