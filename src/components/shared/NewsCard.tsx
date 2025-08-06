'use client'

import Link from 'next/dist/client/link'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { NewsCardProps } from '@/types/newsitem'
import { ThemeContext } from '@/app/context/themeContext'

const NewsCard = ({ item }: NewsCardProps) => {
    const themeContext = useContext(ThemeContext)
    const isDarkMode = themeContext?.isDarkMode || false

    return (
        <div className={`border p-4 rounded-md shadow-md transition-colors duration-200 hover:shadow-lg ${
            isDarkMode 
                ? 'border-gray-700 bg-gray-800 text-white hover:bg-gray-750' 
                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
        }`}>
            <Link href={`/news/${item?.id}`} >
                <Image 
                    className='mb-5 md:h-56 rounded-md hover:scale-105 cursor-pointer transition-all duration-300' 
                    src={item?.image} 
                    alt='card Image' 
                    width={500} 
                    height={500} 
                    priority
                />
            </Link>

            <div>
                <h2 className={`text-xl font-bold my-3 transition-colors duration-200 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    {item?.title}
                </h2>
                <p className={`mb-5 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                    {item?.summary}
                </p>
                <p className={`text-sm mb-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    Category: {item?.category}
                </p>
                <p className={`text-sm mb-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    Team: {item?.team}
                </p>
                <p className={`text-sm mb-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    Date: {new Date(item?.date).toLocaleDateString()}
                </p>
                <Link href={`/news/${item?.id}`}>
                    <Button 
                        variant={'default'} 
                        className={`transition-colors duration-200 ${
                            isDarkMode 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        Read More
                    </Button>
                </Link>
            </div>
        </div >
    )
}

export default NewsCard