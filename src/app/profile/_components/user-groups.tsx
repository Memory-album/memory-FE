'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getUserGroups } from '@/features/group/api/getUserGroups';
import { GroupActionDrawer } from './group-action-drawer';

type GroupInfoProps = {
  id: string;
  name: string;
  groupImageUrl: string;
  description: string;
  ownerName: string;
};

export const UserGroups = () => {
  const router = useRouter();

  const {
    data: groups,
    isLoading,
    isSuccess,
  } = useQuery({
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
      <div aria-live="assertive" aria-atomic="true">
        {isLoading && (
          <span className="sr-only">
            참여 중인 그룹 정보를 불러오는 중입니다
          </span>
        )}

        {isSuccess && groups && (
          <span className="sr-only">
            참여 중인 그룹 정보를 성공적으로 불러왔습니다
          </span>
        )}
      </div>
      {isLoading && (
        <p className="w-full h-[200px] text-[#c6c7cb] flex items-center justify-center text-center">
          <AiOutlineLoading3Quarters className="size-8 animate-spin" />
        </p>
      )}
      {groups?.length == 0 && (
        <p className="text-center text-[#c6c7cb]">참여 중인 그룹이 없어요.</p>
      )}
      {groups && (
        <div className="grid grid-cols-2 gap-3 items-start justify-items-center">
          {groups.map((group: GroupInfoProps) => (
            <div
              className="w-full overflow-hidden cursor-pointer hover:opacity-80"
              key={group.id}
              onClick={() => router.push(`/groups/${group.id}/dashboard`)}
            >
              <div className="relative mb-3 size-[150px] rounded-[14px] overflow-hidden">
                <Image
                  src={group.groupImageUrl}
                  alt="그룹 이미지"
                  fill
                  sizes="150px"
                />
              </div>
              <strong className="mb-1 text-sm block w-[100px] truncate">
                {group.name}
              </strong>
              <p className="mb-[7px] text-xs w-[120px] h-fit max-h-[32px] overflow-hidden line-clamp-2">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
