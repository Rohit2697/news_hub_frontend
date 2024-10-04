'use client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import env from '@/env';
export default function SignIn() {
  const router = useRouter();
  const [token, setToken] = useState('');
  useEffect(() => {
    const getCookie = cookie.parse(document.cookie);
    if (getCookie.token) {
      setToken(getCookie.token);
      return router.push('/');
    }
  }, [token, router]);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password)
      return setErrorMsg('Enter valid username and password');
    try {
      setLoading(true);
      const loginResult = (await axios.post(env.news_hub_api + '/login-user', {
        email,
        password,
      })) as AxiosResponse<{ token: string }>;
      const setCookie = cookie.serialize('token', loginResult.data.token, {
        maxAge: 59 * 60,
        path: '/',
      });

      document.cookie = setCookie;
      setLoading(false);
      setErrorMsg('');
      return router.push('/');
    } catch (err) {
      setLoading(false);
      console.log(err);
      setErrorMsg('Invalid email or password');
    }
  };
  if (token) return;
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
              <label className="font-semibold">Password</label>
              <div className="flex flex-row items-center relative h-10">
                <Input
                  type={!showPassword ? 'password' : 'text'}
                  placeholder="enter your password"
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
            </div>
            <div className="flex gap-4 flex-row justify-center">
              <Button variant="secondary">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button
                onClick={() => handleLogin(email, password)}
                disabled={email && password ? false : true}
              >
                Sign In
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
          <Link
            href="/forgot-password"
            className="font-semibold text-sm hover:text-red-500"
          >
            Forgot Password
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
