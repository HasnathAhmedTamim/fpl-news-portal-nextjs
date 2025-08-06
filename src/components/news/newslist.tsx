'use client'
import React, { useEffect, useState } from 'react'
import fetchNews from '@/lib/fetchNews'
import { NewsItem } from '@/types/newsitem'
import NewsCard from '../shared/NewsCard'
import SearchBar from './SearchBar'
import SimpleSearchBar from './SimpleSearchBar'
import CategoryFilter from './CategoryFilter'
import SimpleCategoryFilter from './SimpleCategoryFilter'

const NewsList = () => {
    // State to hold news items and UI states
    const [news, setNews] = useState<NewsItem[]>([])
    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    // Fetch news based on category and search term
    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true)
                setError('')
                const data = await fetchNews(category, search);
                
                if (Array.isArray(data)) {
                    setNews(data);
                } else {
                    setNews([]);
                    console.warn('NewsList: API did not return an array:', data);
                }
            } catch (err) {
                console.error('NewsList: Error fetching news:', err);
                setError('Failed to fetch news. Please try again later.');
                setNews([]);
            } finally {
                setLoading(false)
            }
        };
        
        getNews();
    }, [category, search]);

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="border rounded-lg p-4 animate-pulse">
                    <div className="bg-gray-300 h-48 w-full rounded mb-4"></div>
                    <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 w-full rounded"></div>
                </div>
            ))}
        </div>
    )

    return (
        <div className="min-h-screen">
            <div className='flex flex-col md:flex-row justify-between items-start mb-8 gap-4 md:gap-12'>
                <SearchBar onSearch={setSearch} />
                <CategoryFilter onCategoryChange={setCategory} />
            </div>
            
            {/* Error state */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            )}
            
            {/* Loading state */}
            {loading && <LoadingSkeleton />}
            
            {/* News cards */}
            {!loading && !error && (
                <>
                    {news.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {news.map((item) => (
                                <NewsCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📰</div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                No news found
                            </h3>
                            <p className="text-gray-500">
                                {search ? 
                                    `No results found for "${search}". Try different keywords.` : 
                                    'No news articles available at the moment.'
                                }
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default NewsList