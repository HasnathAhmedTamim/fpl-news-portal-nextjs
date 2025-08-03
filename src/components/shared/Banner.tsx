import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import bannerImg from "@/app/assets/banner.png"
const Banner = () => {
  return (
    <div className=''>
      <div className='px-4 py-8 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8'>
        {/* images */}


        <div className='space-y-4 flex flex-col '>
          <h4 className=' text-shadow-gray-300 font-bold text-3xl'>Welcome to the FPL News</h4>
          <p className='text-gray-600 text-xl text-justify'>Stay updated with the latest news and insights from the world of Fantasy Premier League. Join our community and enhance your FPL experience!</p>

        </div>

        <div className=''>
          
          <Image src={bannerImg} alt='Banner Image' />
        </div>
      </div>



    </div>
  )
}

export default Banner