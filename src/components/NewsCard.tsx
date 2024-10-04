'use client';
import { NewsCardProps } from '@/interface';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from './ui/card';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import dateToString from '@/lib/dateToString';
import trimString from '@/lib/trimContent';
//import Link from 'next/link';
import { Button } from './ui/button';
import LikeButton from './LikeButton';

export default function NewsCard({ newsArticle, newsId }: NewsCardProps) {
  const handleOpenPage = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <Card className="flex flex-col md:flex-row mb-2 gap-2 h-auto p-2">
      <div
        className="flex justify-start h-40 md:h-60 w-full md:w-96"
        aria-label="image"
      >
        <Image
          src={newsArticle.urlToImage}
          alt={newsArticle.source.name}
          height={300}
          width={300}
          className="h-full w-full rounded"
        />
      </div>
      <div className="flex justify-start  w-full" aria-label="content">
        <div>
          <CardHeader>
            <CardTitle
              className="cursor-pointer"
              onClick={() => handleOpenPage(newsArticle.url)}
            >
              {newsArticle.title}
            </CardTitle>
            <CardDescription>
              <strong>Published by</strong> {newsArticle.author} on{' '}
              {dateToString(newsArticle.publishedAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {DOMPurify.sanitize(trimString(newsArticle.content))}
          </CardContent>
          <CardFooter className="text-sm flex flex-row justify-start items-center space-x-1">
            <span>Read more at</span>
            <Button
              className="p-1"
              variant="ghost"
              onClick={() => handleOpenPage(newsArticle.url)}
            >
              {newsArticle.source.name}
            </Button>
            <LikeButton newsId={newsId} />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
