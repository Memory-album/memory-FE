'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { User as UserType } from '@/model/user';

interface Props {
  user: UserType;
}

export const UserInfo = ({ user }: Props) => {
  const router = useRouter();

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
