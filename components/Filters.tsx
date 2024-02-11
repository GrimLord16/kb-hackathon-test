"use client";
import React from 'react'
import { Switch } from './ui/switch'
import { Checkbox } from './ui/checkbox';
import { AuctionSearchParams } from '@/types/general';
import { useSearchParams } from 'next/navigation';

const categories = [
  'army',
  'tech',
  'Environment',
  'Human Rights',
  'Animals',
  'Arts',
  'Community',
  'International',
  'Religion',
  'Science',
  'Social Services',
  'Sports',
  'Other'
];

type OwnProps = {
  onFilterChange: <T extends keyof AuctionSearchParams>(name: T, value: AuctionSearchParams[T]) => void
}

const Filters = ({ onFilterChange }: OwnProps) => {
  const searchParams = useSearchParams();
  const [charity, setCharity] = React.useState<"true"| "">("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    const charity = searchParams.get('charity');
    if (charity === "true" || charity === "") {
      setCharity(charity);
    }

    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories(category.split(','));
    }
  }, [searchParams]);


  React.useEffect(() => {
    onFilterChange('charity', charity);
  }, [charity, onFilterChange]);

  React.useEffect(() => {
    onFilterChange('category', selectedCategories.join(','));
  }, [selectedCategories, onFilterChange]);

  return (
    <div className='bg-backgroundOverlay h-min overflow-auto rounded-lg p-4  px-8 pl-6 flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <Switch 
          onCheckedChange={(checked) => {
            setCharity(checked ? "true" : "");
          }} 
          checked={charity === "true"}
        /> charity
      </div>
      <div>
        <span className='text-accent font-semibold'>Category</span>
        {
          categories.map((category) => (
            <div key={category}>
              <Checkbox id={category} className='mr-2' onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedCategories(prev => [...prev, category]);
                } else {
                  setSelectedCategories(prev => prev.filter(c => c !== category));
                }
              }}
              checked={selectedCategories.includes(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Filters