'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { IoSearch, IoClose } from 'react-icons/io5';
import { Button } from '../ui/button';

interface SimpleSearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SimpleSearchBar = ({ onSearch }: SimpleSearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    // Handle input change - immediate search (no debouncing for testing)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        console.log('SimpleSearchBar: Input changed to:', value);
        setSearchTerm(value)
        onSearch(value) // Immediate search
    }

    // Clear search
    const handleClearSearch = () => {
        console.log('SimpleSearchBar: Clearing search');
        setSearchTerm('')
        onSearch('')
    }

    return (
        <div className='mb-4 w-full md:w-3/4'>
            <h3 className='text-lg font-semibold mb-2 text-gray-800'>
                Search FPL News (Simple Version)
            </h3>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <IoSearch className='h-4 w-4 text-gray-400' />
                </div>
                
                <Input
                    value={searchTerm}
                    onChange={handleInputChange}
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
            
            <p className='text-xs text-gray-500 mt-1'>
                Search term: "{searchTerm}" (immediate search, no debounce)
            </p>
        </div>
    )
}

export default SimpleSearchBar
