'use client';
import capitalizeFirstLetter from '@/lib/capitalizeFirstLetter';
import { SheetHeader, SheetTitle } from './ui/sheet';

import { useNewsDispatch, useNewsSelector } from '@/state/hooks';
import { updateCategory } from '@/state/categorySlice';
import { updatePage } from '@/state/pageNumberSlice';
import getAllNews from '@/lib/getAllNews';
import { updateContext } from '@/state/contextSlice';
import getCategoryNews from '@/lib/getCategoryNews';
import getRecommendation from '@/lib/getRecommendation';

const categories = [
  'recommended',
  'all news',
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];
export default function SideBar() {
  const category = useNewsSelector((state) => state.category.category);

  const dispatch = useNewsDispatch();
  const deselectClass =
    'hover:rounded text-sm md:text-base flex h-10 w-30 md:w-40 cursor-pointer hover:font-semibold    dark:text-white   hover:bg-gray-400 dark:hover:text-black justify-center items-center';

  const selectedClass =
    'rounded text-sm md:text-base flex h-10 w-30 md:w-40 cursor-pointer font-semibold text-white dark:text-black bg-red-700  justify-center items-center';
  const handleCategory = (categoryToSelect: string) => {
    dispatch(updateContext('category'));
    if (categoryToSelect === 'all news') {
      dispatch(getAllNews());
    } else if (categoryToSelect === 'recommended') {
      dispatch(getRecommendation());
      // dispatch(updateContext('recommended'));
    } else {
      dispatch(getCategoryNews({ category: categoryToSelect }));
    }
    dispatch(updateCategory(categoryToSelect));
    dispatch(updatePage(1));

    // setOpenSideBar(false);
  };
 
  return (
    <div>
      <SheetHeader className="mb-2 font-semibold text-base md:text-xl">
        <SheetTitle>Categories</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col">
        <ul>
          {categories.map((categorystr, index) => (
            <li
              className={
                category === categorystr ? selectedClass : deselectClass
              }
              key={`category-${index}-${categorystr}`}
              onClick={() => handleCategory(categorystr)}
            >
              {capitalizeFirstLetter(categorystr)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
