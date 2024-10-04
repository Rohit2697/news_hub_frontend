'use client';
import cookie from 'cookie';
import Navbar from '@/components/Navbar';
import HomeClient from './HomeClient';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const Page = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  useEffect(() => {
  
    const getToken = cookie.parse(document.cookie);
    if (!getToken.token) return router.push('/login');
    setToken(getToken.token);
  }, [token,router]);

  if (!token) return;
  return (
    <div>
      <Navbar />
      <HomeClient />
      <Footer />
    </div>
  );
};
export default Page;
