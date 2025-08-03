import Link from 'next/link'
import React from 'react'

const FplNewsLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className='py-12 '>
            <h1 className="text-3xl font-bold">FPL Latest News</h1>
            <nav className='space-x-4 mb-5'>

                <Link href="/fplnews/fixtures" className=''>Fixtures</Link>
                <Link href="/fplnews/results" className=''>Results</Link>

            </nav>

            <div className='flex justify-between'>
                <div className='md:w-4/5 h-96 bg-slate-500 flex items-center justify-center '>
                    <h1 className='text-2xl font-semibold'>{children}</h1>

                </div>

                <div className='bg-purple-900 h-96 md:w-1/4'>
                    <h1 className='text-white text-2xl font-semibold'>FPL News Sidebar</h1>
                </div>
            </div>
        </div>
    )
}

export default FplNewsLayout