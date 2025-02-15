'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { PiPencilDuotone } from 'react-icons/pi';
import { Dispatch, SetStateAction } from 'react';
import { InviteCodeDialog } from '@/components/invite-code-dialog';

type Props = {
  setIsActive: Dispatch<SetStateAction<boolean>>;
  inviteCode: string;
};

export const MemberActionDropdown = ({ setIsActive, inviteCode }: Props) => {
  const router = useRouter();

  const handleSelectMember = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-block focus:ring-0 focus:outline-none">
            <PiPencilDuotone className="text-[28px] text-[#85B6FF] hover:text-[#85B6FF]/80" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>그룹 멤버 메뉴</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:bg-[#e5e7eb] cursor-pointer"
              onClick={handleSelectMember}
            >
              멤버 삭제
              <DropdownMenuShortcut>
                <FaUserMinus />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <InviteCodeDialog inviteCode={inviteCode}>
              <DropdownMenuItem
                className="hover:bg-[#e5e7eb] cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                멤버 초대
                <DropdownMenuShortcut>
                  <FaUserPlus />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </InviteCodeDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
