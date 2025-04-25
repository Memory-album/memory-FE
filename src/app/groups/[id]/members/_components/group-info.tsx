'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getGroupById } from '@/features/group/api/getGroupById';
interface GroupInfoProps {
  id: string;
}

export const GroupInfo = ({ id }: GroupInfoProps) => {
  const router = useRouter();
  const {
    data: group,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groups', id],
    queryFn: getGroupById,
  });

  useEffect(() => {
    if (isError) {
      alert('해당 그룹을 찾을 수 없습니다. 프로필 페이지로 이동합니다.');
      router.replace('/profile');
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <p className="w-full h-[200px] text-[#c6c7cb] flex items-center justify-center text-center">
        <AiOutlineLoading3Quarters className="size-8 animate-spin" />
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-2">
        <div className="relative mr-[15px] size-[68px] rounded-full overflow-hidden">
          <Image src={group?.groupImageUrl} alt="그룹 이미지" fill />
        </div>
        <strong className="flex-grow text-xl">{group?.name}</strong>
      </div>
      <p className="text-xs text-gray-400">{group?.groupDescription}</p>
    </div>
  );
};
