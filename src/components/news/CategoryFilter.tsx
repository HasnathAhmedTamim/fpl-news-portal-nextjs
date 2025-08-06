'use client'
import React, { useState, useContext } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ThemeContext } from '@/app/context/themeContext';

interface CategoryFilterProps {
    onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
    const themeContext = useContext(ThemeContext)
    const isDarkMode = themeContext?.isDarkMode || false
    
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    // Categories based on the actual API data
    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'Injury', label: 'Injury Updates' },
        { value: 'Transfer', label: 'Transfer News' },
    ]

    const handleValueChange = (value: string) => {
        setSelectedCategory(value)
        // Convert 'all' to empty string for the filtering logic
        onCategoryChange(value === 'all' ? '' : value)
    }

    return (
        <div className="min-w-[200px]">
            <h3 className={`font-semibold mb-2 transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
                Filter by Category
            </h3>
            <Select value={selectedCategory} onValueChange={handleValueChange} defaultValue="all">
                <SelectTrigger className={`w-full transition-colors duration-200 ${
                    isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                }`}>
                    <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent className={`transition-colors duration-200 ${
                    isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
                }`}>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.value}
                            value={category.value}
                            className={`cursor-pointer transition-colors duration-200 ${
                                isDarkMode 
                                    ? 'text-white hover:bg-gray-700 focus:bg-gray-700' 
                                    : 'text-gray-900 hover:bg-gray-100 focus:bg-gray-100'
                            }`}
                        >
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default CategoryFilter