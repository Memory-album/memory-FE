'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { AlertKickoutMember } from './alert-kickout-member';
import { MemberActionDropdown } from './member-action-dropdown';

import { getMembersByGroupId } from '@/features/member/api/getMembersByGroupId';
import { getGroupById } from '@/features/group/api/getGroupById';

interface MemberListProps {
  id: string;
}

type MemberProps = {
  id: string;
  name: string;
  profileImgUrl: string;
  joinAt?: string;
};

export const MemberList = ({ id }: MemberListProps) => {
  const [isActive, setIsActive] = useState(false);

  const { data: members, isLoading: memberLoading } = useQuery({
    queryKey: ['groups', id, 'members'],
    queryFn: getMembersByGroupId,
  });

  const { data: group } = useQuery({
    queryKey: ['groups', id],
    queryFn: getGroupById,
  });

  return (
    <div className="mt-10 pb-[102px]">
      <div className="flex justify-between mb-[17px]">
        <div className="text-[13px] font-semibold border border-t-0 border-x-0 border-b-2 border-b-[#4848F9]">
          멤버 목록 ({members?.length})
        </div>
        {group?.role === 'OWNER' && (
          <MemberActionDropdown
            setIsActive={setIsActive}
            inviteCode={group?.inviteCode}
          />
        )}
      </div>
      {memberLoading && (
        <p className="w-full h-[200px] text-[#c6c7cb] flex items-center justify-center text-center">
          <AiOutlineLoading3Quarters className="size-8 animate-spin" />
        </p>
      )}
      {members && (
        <div className="grid grid-cols-2 gap-3 items-start justify-items-center">
          {members.map((member: MemberProps) => (
            <MemberItem
              key={member.id}
              groupId={id}
              groupname={group.name}
              groupOwnerId={group.ownerUserId}
              memberId={member.id}
              isActive={isActive}
              setIsActive={setIsActive}
              imageUrl={member.profileImgUrl}
              memberName={member.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type MemberItemProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: string;
  groupname: string;
  groupOwnerId: string;
  memberId: string;
  imageUrl: string;
  memberName: string;
};

const MemberItem = ({
  isActive,
  setIsActive,
  groupId,
  groupOwnerId,
  groupname,
  memberId,
  imageUrl,
  memberName,
}: MemberItemProps) => {
  const isOwner = groupOwnerId === memberId;

  return (
    <div className="relative">
      {isActive && !isOwner && (
        <AlertKickoutMember
          setIsActive={setIsActive}
          groupId={groupId}
          groupname={groupname}
          memberId={memberId}
          memberName={memberName}
        />
      )}
      <div className="flex flex-col justify-center items-center">
        <div className="relative mb-3 size-[150px] rounded-[14px] overflow-hidden">
          <Image src={imageUrl} alt="멤버 이미지" fill />
        </div>
        <strong className="mb-[7px] text-sm">{memberName}</strong>
      </div>
    </div>
  );
};
