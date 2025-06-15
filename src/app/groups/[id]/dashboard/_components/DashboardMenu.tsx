'use client';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaExchangeAlt } from 'react-icons/fa';
import useUserStore from '@/store/useUserInfo';

import { InviteCodeDialog } from '@/components/invite-code-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { getGroupById } from '@/features/group/api/getGroupById';

import { FaEdit, FaUsers, FaKey } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
interface DashboardMenuProps {
  groupId: string;
}

export const DashboardMenu = ({ groupId }: DashboardMenuProps) => {
  const router = useRouter();
  const setCurrentGroupId = useUserStore((state) => state.setCurrentGroupId);

  const { data: group, isError } = useQuery({
    queryKey: ['groups', groupId],
    queryFn: getGroupById,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/backend/api/v1/groups/${groupId}/leave`, {
        method: 'delete',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }

      return response.json();
    },
    onSuccess: () => {
      alert('그룹 나가기 성공');
      router.replace(`/profile`);
    },
    onError: (error) => {
      console.log(error);
      alert('그룹에서 나가기 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleSetCurrentGroup = () => {
    if (window.confirm('현재 그룹으로 설정하시겠습니까?')) {
      setCurrentGroupId(Number(groupId));
      alert('현재 그룹이 변경되었습니다.');
      router.push('/home');
    }
  };

  useEffect(() => {
    if (isError) {
      alert('해당 그룹을 찾을 수 없습니다. 프로필 페이지로 이동합니다.');
      router.replace('/profile');
    }
  }, [isError, router]);

  useEffect(() => {
    if (groupId) {
      setCurrentGroupId(Number(groupId));
    }
  }, [groupId, setCurrentGroupId]);

  if (!group) {
    return null;
  }

  return (
    <div className="bg-[#F2F7FF] rounded-[14px] py-[26px] px-2">
      <ul>
        {group.role === 'OWNER' && (
          <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
            <FaEdit className="opacity-60" />
            <Link href={`/groups/${groupId}/edit`}>그룹 수정</Link>
          </li>
        )}
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaUsers className="opacity-60" />
          <Link href={`/groups/${groupId}/members`}>멤버 보기</Link>
        </li>
        <li
          className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer"
          onClick={handleSetCurrentGroup}
        >
          <FaExchangeAlt className="opacity-60" />
          <span>현재 그룹으로 설정</span>
        </li>
        {/* <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaQuestionCircle className="opacity-60" />
          <Link href={`/groups/${groupId}/questions`}>내 질문 보기</Link>
        </li> */}
        {/* <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaHome className="opacity-60" />
          <Link href={`/home`}>홈으로 가기</Link>
        </li> */}
        {group.role === 'OWNER' && (
          <InviteCodeDialog inviteCode={group.inviteCode}>
            <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
              <FaKey className="opacity-60" />
              <p>그룹 초대 코드</p>
            </li>
          </InviteCodeDialog>
        )}
        {group.role !== 'OWNER' && (
          <RemoveDialog>
            <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
              <FaArrowRightFromBracket className="opacity-60" />
              <button
                className="bg-none text-base"
                onClick={() => mutation.mutate()}
              >
                그룹 나가기
              </button>
            </li>
          </RemoveDialog>
        )}
      </ul>
    </div>
  );
};

const RemoveDialog = ({ children }: { children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="w-[450px]">
      <DialogHeader>
        <DialogTitle>그룹에서 나가시겠습니까?</DialogTitle>
        <DialogDescription>나가면 되돌릴 수 없습니다.</DialogDescription>
      </DialogHeader>
      <DialogFooter className="pt-2">
        <DialogClose asChild>
          <button
            type="button"
            className="bg-[#e1e6ed] p-2 rounded-[4px] border-none"
          >
            취소
          </button>
        </DialogClose>
        <button className="bg-[#4848f9] p-2 text-white rounded-[4px] hover:bg-[#4848f9]/80">
          나가기
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
