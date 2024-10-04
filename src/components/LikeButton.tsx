'use client';
import { HiOutlineThumbUp } from 'react-icons/hi';
import { HiThumbUp } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { LikeButtonProps } from '@/interface';
// import { useNewsDispatch } from '@/state/hooks';
import { useNewsSelector } from '@/state/hooks';
import axios from 'axios';
import cookie from 'cookie';
import { useRouter } from 'next/navigation';
import env from '@/env';
// import getAllLikes from '@/lib/getAllLikes';
export default function LikeButton({ newsId }: LikeButtonProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const likes = useNewsSelector((state) => state.news.likes); //string[]
  useEffect(() => {
    if (likes.includes(newsId)) {
      setLiked(true);
    }
  }, [likes, newsId]); // Updated dependency array

  useEffect(() => {
    if (likes.includes(newsId)) setLiked(true);
  }, [newsId, likes]);
  const handleLike = async (newsId: string) => {
    const { token } = cookie.parse(document.cookie);
    if (!token) return router.push('/login');
    try {
      await axios.post(env.news_hub_api + '/add-recommendation/' + newsId, '', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setLiked(true);
    } catch (err) {
      console.log('Unable to like it ', err);
      setLiked(false);
    }
  };
  const handleDislike = async (newsId: string) => {
    const { token } = cookie.parse(document.cookie);
    if (!token) return router.push('/login');
    try {
      await axios.delete(env.news_hub_api + '/dislike/' + newsId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      setLiked(false);
    } catch (err) {
      console.log('Unable to dislike ', err);
      setLiked(true);
    }
  };
  return (
    <div>
      {!liked && (
        <HiOutlineThumbUp
          className="h-5 w-5 cursor-pointer transition-transform duration-300 transform hover:scale-110"
          onClick={() => handleLike(newsId)}
        />
      )}
      {liked && (
        <HiThumbUp
          className="h-5 w-5 cursor-pointer transition-transform duration-300 transform hover:scale-110"
          onClick={() => handleDislike(newsId)}
        />
      )}
    </div>
  );
}
