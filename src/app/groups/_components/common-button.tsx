'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type CommonButtonProps = {
  children: React.ReactNode;
  className?: string;
  link: string;
  type?: 'button' | 'submit' | 'reset';
};

export const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = '',
  link,
  type = 'button',
}) => {
  const router = useRouter();
  return (
    <button
      type={type}
      onClick={() => router.push(link)}
      className={cn(
        'w-[120px] py-[40px] px-[10px] border-solid border-[1px] border-[#4848F9] rounded-[20px] whitespace-nowrap',
        className,
      )}
    >
      {children}
    </button>
  );
};
