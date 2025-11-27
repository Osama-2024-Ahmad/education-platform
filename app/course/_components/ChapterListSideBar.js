import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChaptersConext } from '@/context/SelectedChapter';
import { X } from 'lucide-react';

function ChapterListSideBar({ courseInfo, sidebarOpen, setSidebarOpen }) {

  const courses = courseInfo?.courses;
  const enrolToCourse = courseInfo?.enrolToCourse;
  const courseContent = courseInfo?.courses?.courseContent;

  const { selectedChapters, setSelectedChapters } = useContext(SelectedChaptersConext)

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 z-50
        h-screen w-80 md:w-72 lg:w-80
        bg-slate-100 dark:bg-slate-900 
        border-r border-slate-200 dark:border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Close button for mobile */}
        <div className="flex justify-between items-center p-4 md:hidden border-b border-slate-200 dark:border-slate-700">
          <h2 className='text-blue-500 dark:text-blue-400 text-xl font-bold'>Chapters ({courseContent?.length})</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className='hidden md:block text-blue-500 dark:text-blue-400 m-4 text-xl font-bold'>Chapters ({courseContent?.length})</h2>

        <Accordion type="single" collapsible className="px-2">
          {courseContent?.map((chapter, index) => (
            <AccordionItem
              key={index}
              onClick={() => {
                setSelectedChapters(index);
                // Close sidebar on mobile after selection
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              value={`item-${index}`}
            >
              <AccordionTrigger className="font-bold p-2 my-2 cursor-pointer text-[15px] md:text-[17px] hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-100">
                {index + 1}. {chapter?.courseData?.[0]?.chapterName}
              </AccordionTrigger>
              <AccordionContent>
                <h2 className='bg-white dark:bg-slate-800 p-3 my-2 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-sm'>
                  {chapter?.courseData?.[0]?.topic}
                </h2>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}

export default ChapterListSideBar