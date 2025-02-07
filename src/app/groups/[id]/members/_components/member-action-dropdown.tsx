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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { FaUserMinus, FaUserPlus, FaUsersCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { PiPencilDuotone } from 'react-icons/pi';
import { Dispatch, SetStateAction, useState } from 'react';
import { InviteMember } from './invite-member';

type Props = {
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

export const MemberActionDropdown = ({ setIsActive }: Props) => {
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
            <InviteMember>
              <DropdownMenuItem
                className="hover:bg-[#e5e7eb] cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                멤버 초대
                <DropdownMenuShortcut>
                  <FaUserPlus />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </InviteMember>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
