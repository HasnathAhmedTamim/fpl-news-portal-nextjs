'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import { ThemeContext } from '@/app/context/themeContext'

const Banner = () => {
  const themeContext = useContext(ThemeContext)
  const isDarkMode = themeContext?.isDarkMode || false

  return (
    <div className={`transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className='px-4 py-8 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8'>
        {/* Text Content */}
        <div className='space-y-4 flex flex-col'>
          <h4 className={`font-bold text-3xl transition-colors duration-200 ${
            isDarkMode 
              ? 'text-white text-shadow-gray-700' 
              : 'text-gray-900 text-shadow-gray-300'
          }`}>
            Welcome to the FPL News
          </h4>
          <p className={`text-xl text-justify transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Stay updated with the latest news and insights from the world of Fantasy Premier League. 
            Join our community and enhance your FPL experience!
          </p>
        </div>

        {/* Image */}
        <div className=''>
          <Image 
            src='https://i.ibb.co.com/rKXNRCPz/banner.png' 
            alt='Banner Image'  
            width={500} 
            height={500} 
            priority 
            className={`rounded-lg transition-all duration-200 ${
              isDarkMode ? 'opacity-90' : 'opacity-100'
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default Banner