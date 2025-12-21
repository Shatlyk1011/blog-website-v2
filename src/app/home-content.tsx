'use client'

import Image from 'next/image'
import Link from 'next/link'
import posthog from 'posthog-js'
import { useState, useEffect, useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import Confetti from 'react-confetti'
import { Post } from '@/utils/mdx'
import { getYearsOfProfessionalExperience } from '@/constants'

interface HomeContentProps {
  posts: Post[]
}

export function HomeContent({ posts }: HomeContentProps) {

  const [showAnimation, setShowAnimation] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const years = getYearsOfProfessionalExperience()

  const handleMouseEnter = () => {
    setIsHovering(true)
    timeoutRef.current = setTimeout(() => {
      setShowAnimation(true)
      handlePhotoClick()
    }, 500)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setShowAnimation(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handlePhotoClick = () => {
    setShowConfetti(true)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="flex mt-2 items-center justify-items-center justify-start flex-col sm:flex-row">
        <div
          className="relative w-20 h-20 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handlePhotoClick}
        >
          <div
            className={`absolute -inset-1 bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full blur-sm transition-all duration-500 ${
              showAnimation ? 'opacity-75 animate-spin' : 'opacity-0'
            }`}
          ></div>
          <div
            className={`absolute -inset-0.5 bg-linear-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full transition-all duration-500 ${
              showAnimation ? 'opacity-100 animate-spin' : 'opacity-0'
            }`}
          ></div>

          {isHovering && !showAnimation && (
            <div className="absolute -inset-2 rounded-full !border-2 !border-blue-500 !animate-pulse !opacity-60"></div>
          )}

          <div className="relative w-full h-full bg-neutral-50 dark:bg-black rounded-full p-0.5">
            <Image
              src="/static/images/profile.png"
              alt="Shatlyks's profile picture"
              fill
              priority
              className={`rounded-full object-cover transition-transform duration-300 ${
                isHovering ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        </div>
        <div className="sm:ml-6 mt-4 sm:mt-0 flex justify-center flex-col">
          <h1 className="text-2xl text-gray-900 dark:text-white font-bold">
            Shatlyk Abdullayev
          </h1>
          <h2 className="text-xl text-gray-500 dark:text-gray-300 font-light">
            Software Engineer
          </h2>
        </div>
      </div>

      <section className="text-sm font-normal font-sans mt-6 flex flex-col gap-4 text-gray-700 dark:text-gray-200">
        <p>Hi, I’m Shatlyk, a freelance web developer and designer with over {years} years of experience crafting scalable, user-focused web applications. I specialize in building modern, responsive solutions using best practices.</p>
        <p>
          Previously worked as a led frontend teams on large-scale projects, driving both performance enhancements and top-tier SEO results. Managed the entire development cycle—from initial concept and architecture through deployment and optimization.
        </p>
        <p>I’m open to <b>freelance</b> or collaborative projects. If you’re looking for someone passionate about both design and development <a className='text-blue-600 dark:text-blue-400' href="https://shatlykabdullayev.com" target="_blank" rel="noopener">let’s connect</a></p>
      </section>

      <section className="mt-8 text-base text-slate-800 dark:text-gray-100">
        <Link
          href={'blog'}
          className="group h-10 leading-[100%] flex items-center gap-2 text-lg font-normal text-slate-600 dark:text-gray-400 mb-6 hover:text-slate-800 dark:hover:text-gray-100 transition-colors duration-200"
        >
          <span>Posts</span>
          <span className='leading-0'>
            <ChevronRight size={16} className=" leading-[100] transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
        <div className="space-y-1">
          {(() => {
            // Group posts by year
            const postsByYear =
              posts?.reduce((acc, post) => {
                const year = new Date(post.data.publishedTime).getFullYear()
                if (!acc[year]) acc[year] = []
                acc[year].push(post)
                return acc
              }, {} as Record<number, typeof posts>) || {}

            // Sort years in descending order
            const sortedYears = Object.keys(postsByYear)
              .map(Number)
              .sort((a, b) => b - a)

            return sortedYears.map((year) => (
              <div key={year}>
                {postsByYear[year].map(
                  ({ data: { publishedTime, title, href } }, index) => (
                    <Link
                      key={title}
                      href={href}
                      className="group flex items-center py-2 px-3 -mx-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      onClick={() => {
                        posthog.capture('blog-card-clicked-home', {
                          href,
                          title,
                        })
                      }}
                    >
                      <div className="w-12 shrink-0 text-sm text-gray-500 dark:text-gray-400">
                        {index === 0 ? year : ''}
                      </div>
                      <div className="flex-1 text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                        {title}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-200">
                        <time dateTime={publishedTime.toString()}>
                          {new Intl.DateTimeFormat(
                            "en-US",
                            {
                              month: '2-digit',
                              day: '2-digit',
                            },
                          ).format(new Date(publishedTime))}
                        </time>
                      </div>
                    </Link>
                  ),
                )}
              </div>
            ))
          })()}
        </div>
      </section>

      {showConfetti && (
        <Confetti
          className='w-full'
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          onConfettiComplete={() => {
            setShowConfetti(false)
          }}
          colors={[
            '#3B82F6',
            '#60A5FA',
            '#93C5FD',
            '#DBEAFE',
            '#1D4ED8',
            '#2563EB',
          ]}
        />
      )}
    </>
  )
}
