'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">페이지를 찾을 수 없습니다</h2>
      <Button onClick={() => router.push('/')}>홈으로 돌아가기</Button>
    </div>
  );
}
