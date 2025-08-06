'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Input } from '../ui/input';
import { IoSearch, IoClose } from 'react-icons/io5';
import { Button } from '../ui/button';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isSearching, setIsSearching] = useState<boolean>(false)

    // Debounce function to avoid too many API calls
    const debounce = useCallback((func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout
        return (...args: any[]) => {
            clearTimeout(timeoutId)
            setIsSearching(true)
            timeoutId = setTimeout(() => {
                func(...args)
                setIsSearching(false)
            }, delay)
        }
    }, [])

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((term: string) => {
            onSearch(term)
        }, 300), // Reduced debounce time for better responsiveness
        [onSearch]
    )

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        debouncedSearch(value)
    }

    // Clear search
    const handleClearSearch = () => {
        setSearchTerm('')
        onSearch('')
        setIsSearching(false)
    }

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            onSearch(searchTerm)
            setIsSearching(false)
        }
    }

    return (
        <div className='mb-4 w-full md:w-3/4'>
            <h3 className='text-lg font-semibold mb-2 text-gray-800'>
                Search FPL News
            </h3>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <IoSearch className={`h-4 w-4 transition-colors ${
                        isSearching ? 'text-blue-500 animate-pulse' : 'text-gray-400'
                    }`} />
                </div>
                
                <Input
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className='pl-10 pr-10 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                    placeholder='Search by title, team, or category...'
                    type="text"
                />
                
                {searchTerm && (
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearSearch}
                            className='h-6 w-6 p-0 hover:bg-gray-100 rounded-full'
                        >
                            <IoClose className='h-3 w-3 text-gray-400 hover:text-gray-600' />
                        </Button>
                    </div>
                )}
            </div>
            
            {isSearching && (
                <p className='text-xs text-blue-500 mt-1 flex items-center gap-1'>
                    <span className='inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
                    Searching...
                </p>
            )}
            
            {searchTerm && !isSearching && (
                <p className='text-xs text-gray-500 mt-1'>
                    Press Enter to search or wait for auto-search
                </p>
            )}
        </div>
    )
}

export default SearchBar