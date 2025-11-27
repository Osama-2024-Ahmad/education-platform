"use client"
import Header from '@/app/dashboard/_components/Header'

import React, { useEffect, useState } from 'react'
import ChapterListSideBar from '../_components/ChapterListSideBar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'
function Course() {

  const { courseId } = useParams()
  const [courseInfo, setCourseInfo] = useState()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!courseId) return;
    getEnrolledCourseId();
  }, [courseId]);


  const getEnrolledCourseId = async () => {
    const result = await axios.get("/api/enroll-course?courseId=" + courseId)
    console.log(result.data)
    setCourseInfo(result.data)
  }
  return (
    <div>
      <Header hideSideBar={true} />
      <div className='flex flex-col md:flex-row'>

        <ChapterListSideBar courseInfo={courseInfo} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <ChapterContent courseInfo={courseInfo} setSidebarOpen={setSidebarOpen} />
      </div>
    </div>
  )
}

export default Course