'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Fnb from '@/components/Fnb';
import Gnb from '@/components/Gnb';
import RQProvider from './RQProvider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 그리드 레이아웃을 적용하지 않을 경로들
  const noGridPaths = [
    '/signup',
    '/login',
    /^\/groups\/\d+\/albums\/\d+\/photo\/\d+$/,
  ];
  const noMarginPaths = [
    '/login',
    '/signup',
    /^\/groups\/\d+\/albums$/,
    '/signup/group/create',
    '/signup/join',
  ]; // 필요한 경로를 여기에 추가하세요
  const noGnbMarginPaths = ['/home', '/signup/join']; // 필요한 경로를 여기에 추가하세요

  return (
    <RQProvider>
      <div className="flex flex-col min-h-screen">
        <Gnb />
        {!noGnbMarginPaths.includes(pathname) && (
          <div className="ForGnbmarginTop" />
        )}
        <div
          className={`${
            !noGridPaths.some((pattern) =>
              typeof pattern === 'string'
                ? pattern === pathname
                : pattern.test(pathname),
            )
              ? 'grid'
              : ''
          } flex-1`}
        >
          {children}
        </div>
        {!noMarginPaths.some((pattern) =>
          typeof pattern === 'string'
            ? pattern === pathname
            : pattern.test(pathname),
        ) && <div className="h-[87px]" />}
        <Fnb />
      </div>
    </RQProvider>
  );
}
