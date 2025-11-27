import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Book, Loader2Icon, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

function CourseCard({ course }) {
  const [loading, setLoading] = useState(false)
  const onEnrollCourse = async () => {

    try {
      setLoading(true)
      const result = await axios.post("/api/enroll-course", {
        courseId: course?.cid
      })
      console.log(result.data)
      toast.success("enrolled successfully")
      setLoading(false)
    } catch (e) {
      toast.error("an error happened")
      setLoading(false)
      console.log(e)
    }


  }
  return (
    <div className='mt-5 hover:scale-105 transition-all cursor-pointer shadow-sm rounded-lg border border-slate-200 p-2 h-full flex flex-col'>

      <Image src={course?.imageURL} width={400} height={400} alt={course?.imageURL} className='w-full h-[250px] object-cover rounded-lg' />

      <div className='flex flex-col gap-3 p-2 flex-grow'>
        <h2 className='font-bold text-blue-500 text-[20px] mt-2 line-clamp-2'>{course?.courseJson?.course?.name}</h2>
        <p className='line-clamp-2 text-slate-500 dark:text-slate-400 min-h-[3rem]'>{course?.courseJson?.course?.description}</p>

        <div className='flex item-center justify-between mt-auto'>
          <h2 className='flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300'><Book /> {course?.courseJson?.course?.chapters} Chapters</h2>

          <Button disabled={loading} onClick={onEnrollCourse} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">{loading ? <Loader2Icon className='animate-spin' /> : <PlayCircle />}  Enroll Course</Button>
        </div>
      </div>


    </div>
  )
}

export default CourseCard