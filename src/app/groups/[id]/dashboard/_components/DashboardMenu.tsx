'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getGroupById } from '@/features/group/api/getGroupById';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CopyIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FaEdit, FaUsers, FaQuestionCircle, FaKey } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
interface DashboardMenuProps {
  groupId: string;
}

export const DashboardMenu = ({ groupId }: DashboardMenuProps) => {
  const router = useRouter();

  const {
    data: group,
    isError,
    error,
  } = useQuery({
    queryKey: ['groups', groupId],
    queryFn: getGroupById,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/${groupId}/leave`,
        {
          method: 'delete',
          credentials: 'include',
        },
      );

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

  if (isError) {
    console.error('에러 발생:', error);

    if (
      error?.message.includes('Unauthorized') ||
      error?.message.includes('로그인')
    ) {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      router.replace('/login');
    } else {
      return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
    }
  }

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
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaQuestionCircle className="opacity-60" />
          <Link href={`/groups/${groupId}/questions`}>내 질문 보기</Link>
        </li>
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

const InviteCodeDialog = ({
  inviteCode,
  children,
}: {
  inviteCode: string;
  children: React.ReactNode;
}) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(inviteCode)
      .then(() => alert('코드가 복사되었습니다!'));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[450px] flex flex-col items-center">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>앨범을 공유할 가족을 초대해보세요!</DialogTitle>
          <DialogDescription className="text-[#8C8989]">
            아래 코드로 멤버를 초대할 수 있어요.
          </DialogDescription>
        </DialogHeader>
        <strong className="text-4xl text-[#4848F9]">{inviteCode}</strong>
        <Button
          onClick={handleCopy}
          className="w-fit text-base bg-transparent hover:bg-transparent hover:opacity-80 border border-blue-100 text-black"
        >
          Copy link <CopyIcon className="size-4 ml-2" />
        </Button>
      </DialogContent>
    </Dialog>
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
