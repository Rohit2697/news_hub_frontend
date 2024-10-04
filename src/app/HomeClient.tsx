'use client';
import NewsCard from '@/components/NewsCard';

import cookie from 'cookie';
import Loading from '@/components/Loading';
import NoResult from '@/components/NoResult';
import { useNewsDispatch, useNewsSelector } from '@/state/hooks';
import { useEffect } from 'react';
import getAllNews from '@/lib/getAllNews';
import { useRouter } from 'next/navigation';

export default function HomeClient() {
  const router = useRouter();
  const dispatch = useNewsDispatch();
  const allNewsResult = useNewsSelector((state) => state.news);

  useEffect(() => {
    const { token } = cookie.parse(document.cookie);
    if (!token) return router.push('/login');
    dispatch(getAllNews());
    // dispatch(getAllLikes());
  }, [dispatch, router]);

  return (
    <div className="flex flex-col mx-auto container justify-center p-4">
      {allNewsResult.status === 'loading' && <Loading />}
      {allNewsResult.status === 'error' && <NoResult />}
      {allNewsResult.status === 'success' &&
        allNewsResult.result.articles.map((newsArticle, index) => (
          <NewsCard
            newsArticle={newsArticle}
            newsId={newsArticle._id}
            key={`newsArticle-${index}`}
          />
        ))}
    </div>
  );
}
