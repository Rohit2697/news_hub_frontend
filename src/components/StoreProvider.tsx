'use client';
import React, { useRef} from 'react';
import { Provider } from 'react-redux';
import { makeNewsStore, NewsStore } from '@/state/store';
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {

   const storeRef = useRef<NewsStore>();


  if (!storeRef.current) storeRef.current = makeNewsStore();
  return <Provider store={storeRef.current}>{children}</Provider>;
}
