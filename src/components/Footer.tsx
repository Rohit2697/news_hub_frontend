'use client';
import { useState, useEffect } from 'react';
import { useNewsDispatch, useNewsSelector } from '@/state/hooks';
import { updatePage } from '@/state/pageNumberSlice';
import getSearchNews from '@/lib/getSearchNews';
import getCategoryNews from '@/lib/getCategoryNews';
import getAllNews from '@/lib/getAllNews';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';
import getRecommendation from '@/lib/getRecommendation';
import getAllLikes from '@/lib/getAllLikes';
export default function Footer() {
  const router = useRouter();
  const dispatch = useNewsDispatch();
  const status = useNewsSelector((state) => state.news.status);
  const currentPage = useNewsSelector((state) => state.page.page);
  const totalResult = useNewsSelector(
    (state) => state.news.result.totalResults
  );

  const [totalPageSet, setTotalPageSet] = useState<number[][]>([]);
  const [currentSet, setCurrentSet] = useState<number[]>([]);
  const context = useNewsSelector((state) => state.context.context);
  const searchState = useNewsSelector((state) => state.searchBox.search);
  const category = useNewsSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getAllLikes())
    function getPaginatedResultSets(totalResults: number): number[][] {
      const numberOfPages = Math.ceil(totalResults / 10);
      const resultSets: number[][] = [];

      for (let i = 0; i < numberOfPages; i += 5) {
        const chunk = Array.from(
          { length: Math.min(5, numberOfPages - i) },
          (_, index) => i + index + 1
        );
        resultSets.push(chunk);
      }

      return resultSets;
    }

    const pageSets = getPaginatedResultSets(totalResult);
    setTotalPageSet(pageSets);

    // Find the set of pages that contains the current page
    const currentPageSet =
      pageSets.find((set) => set.includes(currentPage)) || [];
    setCurrentSet(currentPageSet);
  }, [currentPage, totalResult,dispatch]);

  const selectedClass =
    'z-10 flex items-center justify-center px-3 h-8 leading-tight text-red-600 border border-red-300 bg-red-50 hover:bg-red-100 hover:text-red-700 dark:border-red-700 dark:bg-red-700 dark:text-white';
  const deSelectedClass =
    'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-red-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-red-700 dark:hover:text-white';

  const handlePageClick = (pageNo: number) => {
    const { token } = cookie.parse(document.cookie);
    if (!token) return router.push('/login');
    if (context === 'search') {
      dispatch(getSearchNews({ searchTerm: searchState, page: pageNo }));
    } else if (context === 'category') {
      if (category === 'all news')
        dispatch(getCategoryNews({ category: '', page: pageNo }));
      else if (category == 'recommended')
        dispatch(getRecommendation({ page: pageNo }));
      else dispatch(getCategoryNews({ category, page: pageNo }));
    } else dispatch(getAllNews({ page: pageNo }));
  };

  const handleShowPage = (pageNo: number) => {
    dispatch(updatePage(pageNo));
    handlePageClick(pageNo);
  };

  const handlePreviousSet = () => {
    const currentIndex = totalPageSet.findIndex((set) => set === currentSet);
    if (currentIndex > 0) {
      setCurrentSet(totalPageSet[currentIndex - 1]);
    }
    handlePageClick(currentPage);
  };

  const handleNextSet = () => {
    const currentIndex = totalPageSet.findIndex((set) => set === currentSet);
    if (currentIndex < totalPageSet.length - 1) {
      setCurrentSet(totalPageSet[currentIndex + 1]);
    }
    handlePageClick(currentPage);
  };

  if (status !== 'success') return null;

  return (
    <div className="p-2 bg-background/50 fixed bottom-0 left-0 right-0 backdrop-blur z-10">
      <nav>
        <ul className="flex items-center -space-x-px h-8 text-sm justify-center cursor-pointer">
          {/* Previous Set */}
          <li
            onClick={handlePreviousSet}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-red-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-red-700 dark:hover:text-white ${
              totalPageSet[0] === currentSet
                ? 'pointer-events-none opacity-50'
                : ''
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </li>

          {/* Page Numbers */}
          {currentSet.map((pageNo) => (
            <li
              key={pageNo}
              onClick={() => handleShowPage(pageNo)}
              className={
                currentPage === pageNo ? selectedClass : deSelectedClass
              }
            >
              {pageNo}
            </li>
          ))}

          {/* Next Set */}
          <li
            onClick={handleNextSet}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-red-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-red-700 dark:hover:text-white ${
              totalPageSet[totalPageSet.length - 1] === currentSet
                ? 'pointer-events-none opacity-50'
                : ''
            }`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  );
}
