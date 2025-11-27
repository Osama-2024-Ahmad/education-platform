import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChaptersConext } from '@/context/SelectedChapter';
function ChapterListSideBar({ courseInfo }) {

  const courses = courseInfo?.courses;
  const enrolToCourse = courseInfo?.enrolToCourse;
  const courseContent = courseInfo?.courses?.courseContent;

  const { selectedChapters, setSelectedChapters } = useContext(SelectedChaptersConext)

  return (
    <div className='h-screen w-80 bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700'>
      <h2 className='text-blue-500 dark:text-blue-400 m-4 text-xl font-bold'>Chapters ({courseContent?.length})</h2>

      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem key={index} onClick={() => setSelectedChapters(index)} value={`item-${index}`}>
            <AccordionTrigger className="font-bold p-2 my-2 cursor-pointer text-[17px] hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg mx-2 text-slate-900 dark:text-slate-100">
              {index + 1}. {chapter?.courseData?.[0]?.chapterName}
            </AccordionTrigger>
            <AccordionContent>

              <h2 className='bg-white dark:bg-slate-800 p-3 my-2 mx-2 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'>
                {chapter?.courseData?.[0]?.topic}
              </h2>

            </AccordionContent>
          </AccordionItem>
        ))}


      </Accordion></div>
  )
}

export default ChapterListSideBar