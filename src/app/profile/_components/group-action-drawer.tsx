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
import { GoPlus } from 'react-icons/go';
import { FaUserPlus, FaUsersCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export const GroupActionDrawer = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-block hover:bg-[#e5e7eb] rounded-full focus:ring-0 focus:outline-none">
          <GoPlus className="text-[28px] border-none" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>그룹 메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:bg-[#e5e7eb] cursor-pointer"
            onClick={() => {
              router.push('/groups/create');
            }}
          >
            그룹 생성
            <DropdownMenuShortcut>
              <FaUsersCog />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-[#e5e7eb] cursor-pointer"
            onClick={() => router.push('/groups/join')}
          >
            그룹 참여
            <DropdownMenuShortcut>
              <FaUserPlus />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
