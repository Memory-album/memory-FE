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
import { DialogTrigger } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { FaEdit, FaUsers, FaQuestionCircle, FaKey } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
// TODO: 그룹 수정, 초대 코드 오너만 ..
export const DashboardMenu = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#F2F7FF] rounded-[14px] py-[26px] px-2">
      <ul>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaEdit className="opacity-60" />
          <Link href={`/groups/${id}/edit`}>그룹 수정</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaUsers className="opacity-60" />
          <Link href={`/groups/${id}/members`}>멤버 보기</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaQuestionCircle className="opacity-60" />
          <Link href={`/groups/${id}/questions`}>내 질문 보기</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaKey className="opacity-60" />
          {/* TODO: 초대 코드 조회  */}
          <Link href="#">그룹 초대 코드</Link>
        </li>
        <ConfirmDialog>
          <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
            <FaArrowRightFromBracket className="opacity-60" />
            <button className="bg-none text-base">그룹 나가기</button>
          </li>
        </ConfirmDialog>
      </ul>
    </div>
  );
};

const ConfirmDialog = ({ children }: { children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="w-[450px]">
      <DialogHeader>
        <DialogTitle>그룹에서 나가시겠습니까?</DialogTitle>
        <DialogDescription>나가면 되돌릴 수 없습니다아아아</DialogDescription>
      </DialogHeader>
      <DialogFooter className="pt-2">
        <DialogClose asChild>
          <button type="button" className="bg-[#e1e6ed] p-2 rounded-[4px]">
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
