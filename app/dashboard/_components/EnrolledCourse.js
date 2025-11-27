"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Book } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'
function EnrolledCourse() {

  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    getEnrolledCourse()
  }, [])

  const getEnrolledCourse = async () => {
    const result = await axios.get("/api/enroll-course")
    console.log(result.data)

    // Remove duplicates based on course ID
    const uniqueCourses = result.data.filter((course, index, self) =>
      index === self.findIndex((c) => c?.courses?.cid === course?.courses?.cid)
    )

    setEnrolledCourses(uniqueCourses)
  }

  return enrolledCourses?.length > 0 && (
    <div>
      <h2 className='p-3 mt-5 font-bold text-[34px] border-b-4 border-blue-400 inline-block text-blue-500'>Countinue Learning</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>



        {enrolledCourses?.map((course) => (
          <EnrollCourseCard key={course?.courses?.cid} course={course?.courses} enrolledCourse={course?.enrolToCourse} />
        ))}

      </div>
    </div>
  )
}

export default EnrolledCourse