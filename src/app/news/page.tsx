
'use client'

import NewsList from '@/components/news/newslist'
import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

const News = () => {
  const themeContext = useContext(ThemeContext)
  const isDarkMode = themeContext?.isDarkMode || false

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className={`text-2xl font-bold mb-8 text-center transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Latest FPL News
      </h2>
      <NewsList />

      {/* Add more content or components related to news here */}
    </div>
  )
}

export default News