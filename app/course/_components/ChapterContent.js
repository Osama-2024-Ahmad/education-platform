import { SelectedChaptersConext } from '@/context/SelectedChapter';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';

function ChapterContent({ courseInfo, setSidebarOpen }) {
  const { selectedChapters, setSelectedChapters } = useContext(SelectedChaptersConext)
  const courses = courseInfo?.courses;
  const enrolToCourse = courseInfo?.enrolToCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  const router = useRouter();

  const youTubeVideo = courseContent?.[selectedChapters]?.youtubeVideo
  const topic = courseContent?.[selectedChapters]?.courseData?.[0]?.topic;

  const content = courseContent?.[selectedChapters]?.courseData?.[0]?.content;

  const onEnrollHandler = async () => {
    try {
      const result = await axios.post('/api/enroll-course', {
        courseId: courses?.cid,
      });
      if (result) {
        toast.success("Enrolled Successfully!");
        router.refresh(); // Refresh to update enrollment status
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to enroll");
      console.error(error);
    }
  }

  return (
    <div className='flex-1 p-4 md:p-6 lg:p-8 bg-background overflow-y-auto'>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Menu className="w-5 h-5" />
        <span>Chapters</span>
      </button>

      <h2 className='font-bold text-lg md:text-xl lg:text-[20px] text-blue-500 dark:text-blue-400 mb-4'>
        {selectedChapters + 1}. {courseContent?.[selectedChapters]?.courseData?.[0]?.chapterName}
      </h2>

      {/* Video Section */}
      {youTubeVideo && youTubeVideo.length > 0 && (
        <div className='mb-8'>
          <h3 className='font-semibold text-base md:text-lg mb-4 text-foreground'>📹 Video Tutorials</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {youTubeVideo?.map((video, index) => index < 3 && (
              <div key={index} className='rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-card border border-border'>
                <YouTube
                  videoId={video?.videoId}
                  opts={{
                    height: '200',
                    width: '100%',
                    playerVars: {
                      modestbranding: 1,
                    },
                  }}
                  className='w-full'
                />
                <div className='p-3 bg-card'>
                  <p className='text-xs md:text-sm font-medium text-foreground line-clamp-2'>{video?.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className='mt-6 md:mt-10'>
        {topic && (
          <div className='mb-6'>
            <h3 className='font-bold text-blue-500 dark:text-blue-400 text-lg md:text-xl'>📚 {topic}</h3>
          </div>
        )}

        {!enrolToCourse && <div className='my-5'>
          <Button onClick={onEnrollHandler} className="w-full sm:w-auto">Enroll to Course</Button>
        </div>}

        <div className='p-4 md:p-6 bg-card border border-border rounded-xl shadow-sm'>
          {content && (
            <div
              className='prose prose-sm md:prose-base prose-slate dark:prose-invert max-w-none'
              style={{ lineHeight: "1.8" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterContent