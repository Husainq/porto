'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { HeroType } from '@/app/types/hero'
import HeroSkeleton from '../../Skeleton/Hero'
import { getDataPath, getImgPath } from '@/app/utils/paths'

const Hero = () => {
  const [heroimg, setHeroimg] = useState<HeroType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath('/data.json'))
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setHeroimg(data.HeroData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      <div className='overflow-hidden'>
        <div className='container relative z-20 pt-24'>
          <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 items-center lg:justify-items-normal justify-items-center gap-10 pb-10'>
            
            {/* Bagian Teks */}
            <div className='lg:col-span-8 col-span-1'>
              <div className='flex flex-col lg:items-start items-center'>
                <h1 className='lg:text-start text-center max-w-lg text-2xl lg:text-4xl font-bold leading-tight uppercase tracking-tight'>
                  Hi! I'm a
                  <span className='text-primary'> Web Developer </span>
                  and
                  <span className='text-primary'> Android Developer</span>.
                </h1>
                <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
                  Building digital experiences with precision and care.
                </p>
              </div>
            </div>

            {/* Bagian Gambar (Ukuran Extra Small) */}
            <div className='lg:col-span-4 col-span-1 w-full flex justify-center lg:justify-end'>
              <div className='relative w-full max-w-[200px] md:max-w-[250px]'> {/* Ukuran diperkecil lagi di sini */}
                {loading ? (
                  <HeroSkeleton />
                ) : (
                  heroimg.length > 0 && (
                    <div className="bg-white/10 p-2 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
                      <Image
                        src={getImgPath(heroimg[0].imgSrc)}
                        alt="Hero Image"
                        width={300}
                        height={300}
                        className='rounded-xl w-full h-auto object-contain'
                        priority
                      />
                    </div>
                  )
                )}
              </div>
            </div>

          </div>

          {/* Hiasan Pattern Tetap Ada */}
          <div className='absolute top-16 -left-10 dark:opacity-10 pointer-events-none'>
            <Image src={getImgPath('/images/banner/pattern1.svg')} alt='' width={120} height={120} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero