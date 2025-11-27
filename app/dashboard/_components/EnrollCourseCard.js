import { Book, PlaneIcon, PlayIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function EnrollCourseCard({ course, enrolledCourse }) {

  const calculateProgress = () => {
    const total = course?.courseConent?.length || 0
    const done = enrolledCourse?.coursesDone?.length || 0

    if (total === 0) return 0
    return Math.round((done / total) * 100)
  }
  return (
    <div className='mt-5 hover:scale-105 transition-all cursor-pointer shadow-sm rounded-lg border border-slate-200 p-2 h-full flex flex-col'>

      <Image src={course?.imageURL} width={400} height={400} alt={course?.imageURL} className='w-full h-[250px] object-cover rounded-lg' />

      <div className='flex flex-col gap-3 p-2 flex-grow'>
        <h2 className='font-bold text-blue-500 text-[20px] mt-2 line-clamp-2'>{course?.courseJson?.course?.name}</h2>
        <p className='line-clamp-2 text-slate-500 dark:text-slate-400 min-h-[3rem]'>{course?.courseJson?.course?.description}</p>

        <div className='mt-auto'>
          <h2 className='flex justify-between mb-2 text-blue-400 font-bold'>Progress <span>{calculateProgress()} %</span></h2>
          <Progress value={calculateProgress()} />
          <Link href={"/dashboard/view-course-content/" + course.cid}>
            <Button className="mt-5 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"><PlayIcon />    Countinue Learning</Button>
          </Link>
        </div>
      </div>


    </div>
  )
}

export default EnrollCourseCard