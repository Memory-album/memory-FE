'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { getUser } from '@/features/auth/api/getUser';

type UserType = {
  name: string;
  profileImgUrl: string;
  email: string;
};

export const UserInfo = () => {
  const router = useRouter();
  const { data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  if (error) {
    alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
    router.replace('/login');
  }

  if (!data) {
    return null;
  }

  const user: UserType = data.user;

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="relative mr-[15px] size-[68px] rounded-full overflow-hidden">
          <Image src={user?.profileImgUrl} alt="유저 이미지" fill />
        </div>
        <strong className="flex-grow text-xl">{user?.name}</strong>
      </div>
      <p className="mb-4 text-xs">-</p>
      <Button className="w-full h-7 text-xs rounded-[6px]">프로필 수정</Button>
    </div>
  );
};
