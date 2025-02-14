'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getGroupById } from '@/features/group/api/getGroupById';
interface GroupInfoProps {
  id: string;
}

export const GroupInfo = ({ id }: GroupInfoProps) => {
  const { data: group, isLoading } = useQuery({
    queryKey: ['groups', id],
    queryFn: getGroupById,
  });

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
