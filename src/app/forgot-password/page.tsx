'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import axios from 'axios';
import env from '@/env';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';
export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [reenterPassword, setReenterPassword] = useState('');
  const handlePasswordChange = async (email: string, password: string) => {
    try {
      await axios.patch(env.news_hub_api + '/forgot-password', {
        email,
        password,
      });
      setLoading(false);
      setErrorMsg('');
      const { token } = cookie.parse(document.cookie);
      if (token) {
        const setCookie = cookie.serialize('token', '', {
          maxAge: -1,
          path: '/',
        });
        document.cookie = setCookie;
      }
      return router.push('/login');
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrorMsg('Failed to change password!');
    }
  };
  useEffect(() => {
    if (!password && !reenterPassword) return setMatchPassword(false);
    if (password === reenterPassword) setMatchPassword(true);
    else setMatchPassword(false);
  }, [password, reenterPassword]);
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <Card
        className={`w-96 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <CardHeader className="flex flex-col justify-center items-center gap-6">
          <div className="flex flex-row justify-center items-center gap-4">
            <Image
              alt="logo"
              src="/logo.jpg"
              height={70}
              width={70}
              className="rounded-full"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4 flex-col">
              <label className="font-semibold">Email</label>
              <Input
                type="email"
                placeholder="enter your email"
                className="h-10"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-4 flex-col">
              <label className="font-semibold">New Password</label>
              <div className="flex flex-row items-center relative h-10">
                <Input
                  type={!showPassword ? 'password' : 'text'}
                  placeholder="enter your new password"
                  className="h-full pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <IoEyeOutline
                    className="absolute right-2 h-full cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="absolute right-2 h-full cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>

              <div className="flex gap-4 flex-col">
                <label className="font-semibold">Confirm Password</label>
                <Input
                  type="text"
                  placeholder="re-enter password"
                  className="h-10"
                  onChange={(e) => setReenterPassword(e.target.value)}
                />
                {matchPassword && (
                  <span className="text-sm text-green-500 flex justify-center items-center">
                    Password Matched!
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 flex-row justify-center">
              <Button variant="secondary">
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button
                onClick={() => handlePasswordChange(email, password)}
                disabled={email && matchPassword ? false : true}
              >
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
          <Link
            href="/signup"
            className="font-semibold text-sm hover:text-red-500"
          >
            New to this site?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
