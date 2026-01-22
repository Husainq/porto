'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import { useEffect, useState } from 'react'
import { ProjectType } from '@/app/types/project'
import ProjectSkeleton from '../../Skeleton/Project'
import { getDataPath, getImgPath } from '@/app/utils/paths'

// Pastikan import CSS slick tetap ada
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Project = () => {
  const [project, setProject] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath('/data.json'))
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProject(data.ProjectData || [])
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const settings = {
    dots: true,
    arrows: false, // Set ke true jika ingin tombol navigasi muncul
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false, // Slider otomatis dimatikan
    speed: 500,
    cssEase: 'linear',
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
      { breakpoint: 430, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <div id='project' className='scroll-mt-12'>
      <section className='bg-secondary dark:bg-darklight overflow-hidden py-16'>
        <div className='container relative'>
          
          <div className='mb-4'>
            <h2 className='text-center text-3xl font-bold'>My Projects</h2>
          </div>
          
          <div className='md:max-w-md mx-auto mb-12'>
            <p className='text-xl font-normal text-center leading-8'>
              Selected works that combine innovation with precision.
            </p>
          </div>

          {/* Slider Container */}
          <div className='relative z-20'>
            <Slider {...settings}>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="px-2">
                      <ProjectSkeleton />
                    </div>
                  ))
                : project.map((item, i) => (
                    <div key={i} className="px-2"> {/* Padding untuk jarak antar card */}
                      <div className='p-5 bg-white dark:bg-lightdarkblue rounded-lg shadow-sm border border-transparent hover:border-blue-500 transition-all duration-300'>
                        
                        {/* Box Gambar dengan tinggi tetap */}
                        <div className='w-full mb-4 bg-gray-50 dark:bg-black/20 rounded-lg overflow-hidden flex items-center justify-center'>
                          <div className='relative h-[180px] w-full'>
                            <Image
                              src={getImgPath(item.coverImg)}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 250px"
                              className='object-contain p-3' // object-contain agar gambar tidak kepotong
                              priority={i < 4}
                            />
                          </div>
                        </div>

                        {/* Nama Project & Stack */}
                        <div className='flex items-center gap-3'>
                          <div className="flex-shrink-0">
                            <Image
                              src={getImgPath('/images/project/get-nextjs-logo.svg')}
                              alt='tech-stack'
                              width={28}
                              height={28}
                              className='rounded-full'
                            />
                          </div>
                          <p className='text-base font-semibold text-darkblue dark:text-white truncate'>
                            {item.name}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
            </Slider>
          </div>

          {/* Background Patterns */}
          <div className='absolute top-28 -left-9 dark:opacity-5 pointer-events-none'>
            <Image src={getImgPath('/images/banner/pattern1.svg')} alt='' width={141} height={141} />
          </div>
          <div className='absolute -bottom-7 -right-7 dark:opacity-5 z-10 pointer-events-none'>
            <Image src={getImgPath('/images/banner/pattern2.svg')} alt='' width={141} height={141} />
          </div>

        </div>
      </section>
    </div>
  )
}

export default Project