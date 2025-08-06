'use client'

import { useContext } from 'react'
import { ThemeContext } from './context/themeContext'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const themeContext = useContext(ThemeContext)
  const isDarkMode = themeContext?.isDarkMode || false

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {children}
    </div>
  )
}
