'use client'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Input } from '../ui/input';
import { IoSearch, IoClose } from 'react-icons/io5';
import { Button } from '../ui/button';
import { ThemeContext } from '@/app/context/themeContext';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const themeContext = useContext(ThemeContext)
    const isDarkMode = themeContext?.isDarkMode || false
    
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
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
                Search FPL News
            </h3>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <IoSearch className={`h-4 w-4 transition-colors ${
                        isSearching 
                            ? 'text-blue-500 animate-pulse' 
                            : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                </div>
                
                <Input
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`pl-10 pr-10 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder='Search by title, team, or category...'
                    type="text"
                />
                
                {searchTerm && (
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearSearch}
                            className={`h-6 w-6 p-0 rounded-full transition-colors duration-200 ${
                                isDarkMode 
                                    ? 'hover:bg-gray-700' 
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <IoClose className={`h-3 w-3 transition-colors duration-200 ${
                                isDarkMode 
                                    ? 'text-gray-400 hover:text-gray-200' 
                                    : 'text-gray-400 hover:text-gray-600'
                            }`} />
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
                <p className={`text-xs mt-1 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                    Press Enter to search or wait for auto-search
                </p>
            )}
        </div>
    )
}

export default SearchBar