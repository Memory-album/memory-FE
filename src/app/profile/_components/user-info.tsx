'use client';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

import { getUser } from '@/features/auth/api/getUser';
import { useRouter } from 'next/navigation';

type UserType = {
  name: string;
  profileImgUrl: string;
  email: string;
};

export const UserInfo = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  if (isLoading) {
    return (
      <p className="w-full h-[200px] text-[#c6c7cb] flex items-center justify-center text-center">
        <AiOutlineLoading3Quarters className="size-8 animate-spin" />
      </p>
    );
  }

  const user: UserType = data?.user;

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="relative mr-[15px] size-[68px] rounded-full overflow-hidden">
          <Image src={user?.profileImgUrl} alt="유저 이미지" fill />
        </div>
        <strong className="flex-grow text-xl">{user?.name}</strong>
      </div>
      <Button
        className="w-full h-7 text-xs rounded-[6px]"
        onClick={() => router.push('/profile/edit')}
      >
        프로필 수정
      </Button>
    </div>
  );
};
