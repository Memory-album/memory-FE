'use client';

import Image from 'next/image';
import { GroupActionDrawer } from './group-action-drawer';
import { useQuery } from '@tanstack/react-query';

import { getUserGroups } from '@/features/group/api/getUserGroups';
import { useRouter } from 'next/navigation';

type GroupInfoProps = {
  id: string;
  name: string;
  groupImageUrl: string;
  description: string;
};
export const UserGroups = () => {
  const router = useRouter();

  const { data: groups } = useQuery({
    queryKey: ['user', 'groups'],
    queryFn: getUserGroups,
  });

  return (
    <div className="mt-10 pb-[102px]">
      <div className="flex justify-between mb-[17px]">
        <div className="text-[13px] font-semibold border border-t-0 border-x-0 border-b-2 border-b-[#4848F9]">
          참여 그룹
        </div>
        <GroupActionDrawer />
      </div>
      {!groups && (
        <p className="text-center text-[#c6c7cb]">참여 중인 그룹이 없어요. </p>
      )}
      {groups && (
        <div className="grid grid-cols-2 gap-3 items-start justify-items-center">
          {groups.map((group: GroupInfoProps) => (
            <div
              key={group.id}
              onClick={() => router.push(`/groups/${group.id}/dashboard`)}
            >
              <div className="relative mb-3 size-[150px] rounded-[14px] overflow-hidden cursor-pointer hover:opacity-90">
                <Image
                  src={group.groupImageUrl}
                  alt="그룹 이미지"
                  fill
                  sizes="150px"
                />
              </div>
              <strong className="mb-[7px] text-sm">{group.name}</strong>
              <p className="mb-[7px] text-xs">{group.description}</p>
              <p className="text-[10px] text-[#555555]">@그룹장이름</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
