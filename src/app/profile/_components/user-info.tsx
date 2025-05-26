'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { User as UserType } from '@/model/user';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/features/auth/api/getUser';

interface Props {
  user?: UserType;
}

export const UserInfo = () => {
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ['user', 'groups'],
    queryFn: getUser,
  });

  console.log('USER!!!!', user);

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
