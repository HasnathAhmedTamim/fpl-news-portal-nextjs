'use client'
import React, { useState } from 'react'

interface SimpleCategoryFilterProps {
    onCategoryChange: (category: string) => void;
}

const SimpleCategoryFilter = ({ onCategoryChange }: SimpleCategoryFilterProps) => {
    const [selectedCategory, setSelectedCategory] = useState('')

    const categories = [
        { value: '', label: 'All Categories' },
        { value: 'Injury Update', label: 'Injury Updates' },
        { value: 'Transfer', label: 'Transfer News' },
        { value: 'Tactical', label: 'Tactical Analysis' }
    ]

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedCategory(value)
        onCategoryChange(value)
    }

    return (
        <div className="min-w-[200px]">
            <h3 className='font-semibold mb-2 text-gray-800'>Filter by Category</h3>
            <select 
                value={selectedCategory}
                onChange={handleCategoryChange}
                aria-label="Filter news by category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SimpleCategoryFilter
