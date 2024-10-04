'use client';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { CiUser } from 'react-icons/ci';
//import ThemeToggle from './ThemeToggle';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import SideBar from './SideBar';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useNewsDispatch, useNewsSelector } from '@/state/hooks';

import { updateSearchBox } from '@/state/searchBoxSlice';
import { CiSearch } from 'react-icons/ci';
import { updatePage } from '@/state/pageNumberSlice';
import { updateCategory } from '@/state/categorySlice';
import cookie from 'cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import getSearchNews from '@/lib/getSearchNews';
import { updateContext } from '@/state/contextSlice';
import getAllNews from '@/lib/getAllNews';
export default function Navbar() {
  const router = useRouter();
  const dispatch = useNewsDispatch();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchState = useNewsSelector((state) => state.searchBox.search);

  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    if (!searchState) return;
    const handler = setTimeout(() => {
   
      dispatch(updateContext('search'));
      dispatch(getSearchNews({ searchTerm: searchState }));
      dispatch(updatePage(1));
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchState, dispatch]);
  const handleLogoClick = () => {
    dispatch(getAllNews());
    dispatch(updatePage(1));
    dispatch(updateCategory('all'));
  };
  const handleLogout = () => {
    const { token } = cookie.parse(document.cookie);
    if (!token) return router.push('/login');
    const setcookie = cookie.serialize('token', '', {
      maxAge: -1,
      path: '/',
    });
    document.cookie = setcookie;
    return router.push('/login');
  };

  return (
    <nav className="p-2 bg-background/50 sticky top-0 backdrop-blur border-b z-10 mb-2 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <Sheet>
          <SheetTrigger asChild>
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={() => setOpenSideBar(true)}
            >
              <div className="hamburger-icon">☰</div>
              <span className="hidden md:inline text-base md:text-xl font-semibold">
                Menu
              </span>
            </div>
          </SheetTrigger>
          {openSideBar && (
            <SheetContent side="left" className="w-auto">
              <SideBar />
            </SheetContent>
          )}
        </Sheet>

        <div
          className="cursor-pointer absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2"
          onClick={() => handleLogoClick()}
        >
          <Image
            src="/logo.jpg"
            alt="MNH logo"
            height={48}
            width={48}
            className="h-12 w-12 md:h-13 md:w-13 rounded-full"
          />
          <span className="hidden md:inline-block md:text-2xl md:font-bold">
            News hub
          </span>
        </div>

        <div className="flex justify-center items-center cursor-pointer gap-2 md:gap-4">
          <Input
            id="searchbox"
            type="text"
            className="hidden md:inline-block"
            placeholder="Search news..."
            onChange={(e) => dispatch(updateSearchBox(e.target.value || ''))}
            value={searchState}
          />
          <CiSearch
            className="md:hidden  h-6 w-6"
            onClick={() => setShowSearchBox(!showSearchBox)}
          />
          <div className="hidden md:inline-block">
            <ThemeToggle />
          </div>

          <Button
            onClick={() => handleLogout()}
            className="text-sm md:text-base px-2 py-1 md:px-4 md:py-2 hidden md:inline-block"
          >
            logout
          </Button>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full border-none" variant="ghost">
                  <CiUser className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col justify-center items-center">
                <DropdownMenuItem>
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="ghost" onClick={() => handleLogout()}>
                    logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div>
        <Input
          type="text"
          className={showSearchBox ? 'md:hidden' : 'hidden'}
          placeholder="Search news..."
          onChange={(e) => dispatch(updateSearchBox(e.target.value || ''))}
          value={searchState}
        />
      </div>
    </nav>
  );
}
