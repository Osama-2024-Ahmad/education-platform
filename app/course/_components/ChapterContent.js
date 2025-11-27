import { SelectedChaptersConext } from '@/context/SelectedChapter';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';

function ChapterContent({ courseInfo }) {
  const { selectedChapters, setSelectedChapters } = useContext(SelectedChaptersConext)
  const courses = courseInfo?.courses;
  const enrolToCourse = courseInfo?.enrolToCourse;
  const courseContent = courseInfo?.courses?.courseContent;

  const youTubeVideo = courseContent?.[selectedChapters]?.youtubeVideo
  const topic = courseContent?.[selectedChapters]?.courseData?.[0]?.topic;

  const content = courseContent?.[selectedChapters]?.courseData?.[0]?.content;

  return (
    <div className='p-8 bg-background'>
      <h2 className='font-bold text-[20px] text-blue-500 dark:text-blue-400 mb-4'>
        {selectedChapters + 1}. {courseContent?.[selectedChapters]?.courseData?.[0]?.chapterName}
      </h2>

      {/* Video Section */}
      {youTubeVideo && youTubeVideo.length > 0 && (
        <div className='mb-8'>
          <h3 className='font-semibold text-lg mb-4 text-foreground'>📹 Video Tutorials</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
                  <p className='text-sm font-medium text-foreground line-clamp-2'>{video?.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className='mt-10'>
        {topic && (
          <div className='mb-6'>
            <h3 className='font-bold text-blue-500 dark:text-blue-400 text-xl'>📚 {topic}</h3>
          </div>
        )}

        <div className='p-6 bg-card border border-border rounded-xl shadow-sm'>
          {content && (
            <div
              className='prose prose-slate dark:prose-invert max-w-none'
              style={{ lineHeight: "30px" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterContent