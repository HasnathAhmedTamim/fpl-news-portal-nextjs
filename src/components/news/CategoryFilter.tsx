import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { on } from 'events';
interface CategoryFilterProps {
    onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
    const categories = ['All', 'Injury', 'Transfer', 'Tactical']
    return (
        <div>
            <h3 className='font-semibold mb-2'>Filter by Category</h3>
            <Select onValueChange={(value) => onCategoryChange(value === 'All' ? '' : value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem
                            key={category}
                            value={category}
                            className='cursor-pointer capitalize'
                        >
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default CategoryFilter