'use client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CategoryFilterProps {
    onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
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
            <h3 className='font-semibold mb-2 text-gray-800'>Filter by Category</h3>
            <Select value={selectedCategory} onValueChange={handleValueChange} defaultValue="all">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.value}
                            value={category.value}
                            className='cursor-pointer hover:bg-gray-100 focus:bg-gray-100'
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