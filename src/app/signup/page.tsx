'use client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';
import validator from 'validator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import generateUsername from '@/lib/generateUserName';
import axios, { AxiosResponse } from 'axios';
import env from '@/env';
import cookie from 'cookie';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeEmail = (email: string) => {
    setEmail(email);
    setUsername('');
    if (!validator.isEmail(email)) {
      setValidEmail(false);
      return;
    }
    setValidEmail(true);

    setUsername(generateUsername(email));
  };

  const handlechangePassword = (password: string) => {
    setPassword(password);
    if (!password) {
      setValidPassword(false);
      return;
    }

    setValidPassword(true);
  };
  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    // {
    //   username, email, password, role;
    // }
    try {
      setLoading(true);
      const createUser = (await axios.post(
        env.news_hub_api + '/register-user',
        {
          username,
          email,
          password,
        }
      )) as AxiosResponse<{ message: string; token: string }>;
      const setCookie = cookie.serialize('token', createUser.data.token, {
        maxAge: 59 * 60,
        path: '/',
      });
      document.cookie = setCookie;
      setLoading(false);
      setErrorMsg('');

      return router.push('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrorMsg('Failed to Register User!');
    }
    //const
  };
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
          <CardDescription>Welcome to News Hub😊</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4 flex-col">
              <label className="font-semibold">Username</label>
              <div>
                <div className="flex items-center">
                  <Input
                    type="email"
                    placeholder=""
                    className="h-10 w-full"
                    disabled
                    value={username}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col">
              <label className="font-semibold">Email</label>
              <div>
                <div className="flex items-center">
                  <Input
                    type="email"
                    placeholder="enter your email"
                    className="h-10 w-full"
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </div>
                {!validEmail && email && (
                  <span className=" text-sm flex justify-center items-center text-red-500">
                    Invalid Email!
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 flex-col">
              <label className="font-semibold">Password</label>
              <div>
                <div className="flex items-center">
                  <div className="flex flex-row items-center relative h-10 w-full">
                    <Input
                      type={!showPassword ? 'password' : 'text'}
                      placeholder="enter your password"
                      className="h-full w-full pr-10"
                      onChange={(e) => handlechangePassword(e.target.value)}
                    />
                    <div className="absolute right-2 h-full flex items-center">
                      {showPassword ? (
                        <IoEyeOutline
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <IoEyeOffOutline
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-row justify-center">
              <Button variant="secondary">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                disabled={validEmail && validPassword ? false : true}
                onClick={() => handleSignUp(username, email, password)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
        </CardFooter>
      </Card>
    </div>
  );
}
