import Link from 'next/dist/client/link'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { NewsCardProps } from '@/types/news'

const NewsCard = ({ item }: NewsCardProps) => {
    return (
        <div className='border p-4 rounded-md shadow-md'>
            <Link href={`/news/${item?.id}`} >
                <Image className='mb-5 md:h-56 rounded-md hover:scale-105 cursor-pointer  transition-all duration-300' src={item?.image} alt='card Image' width={500} height={500} />
            </Link>

            <div>
                <h2 className='text-xl font-bold my-3'>
                    {item?.title}
                </h2>
                <p className='mb-5'>{item?.summary}</p>
                <p className='text-gray-500 text-sm mb-2'>Category: {item?.category}</p>
                <p className='text-gray-500 text-sm mb-2'>Team: {item?.team}</p>
                <p className='text-gray-500 text-sm mb-2'>Date: {new Date(item?.date).toLocaleDateString()}</p>
                <Link href={`/news/${item?.id}`} ><Button variant={'default'}>Read More</Button></Link>
            </div>
        </div >
    )
}

export default NewsCard