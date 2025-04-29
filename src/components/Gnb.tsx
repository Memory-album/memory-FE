'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Menu11Icon } from 'hugeicons-react';
import { CgClose } from 'react-icons/cg';
import { BubbleChatNotificationIcon } from 'hugeicons-react';
import { BubbleChatQuestionIcon } from 'hugeicons-react';
import { PiClockCounterClockwiseFill } from 'react-icons/pi';
import { BookOpen02Icon } from 'hugeicons-react';
import { Settings02Icon } from 'hugeicons-react';
import { UserGroupIcon } from 'hugeicons-react';
import { AddTeamIcon } from 'hugeicons-react';
import { DashboardSquareAddIcon } from 'hugeicons-react';
import { Mail01Icon } from 'hugeicons-react';
import useUserStore from '@/store/useUserInfo';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Gnb = () => {
  const { userInfo } = useUserStore();
  const groupId = userInfo?.currentGroupId;
  const pathname = usePathname();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const excludeLayoutRoutes = [
    '/',
    '/home',
    '/login',
    '/signup',
    '/signup/join',
    '/signup/group/create',
    '/groups/create',
    '/groups/join',
  ];

  if (excludeLayoutRoutes.includes(pathname)) {
    return null;
  }

  const handleSideBarToggle = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  const groupEditRegex = /^\/groups\/[^/]+\/edit$/;
  const groupDashboardRegex = /^\/groups\/[^/]+\/dashboard$/;
  const groupMembersRegex = /^\/groups\/[^/]+\/members$/;

  let currentPathName;
  if (pathname.includes('albums')) {
    currentPathName = '앨범';
  } else if (pathname.includes('likes')) {
    currentPathName = '좋아요';
  } else if (pathname.includes('collection')) {
    currentPathName = '컬렉션';
  } else if (pathname === '/answers') {
    currentPathName = '답변하기';
  } else if (pathname === '/uploads/owners') {
    currentPathName = '앨범 만들기';
  } else if (pathname === '/uploads/members') {
    currentPathName = '질문하기';
  } else if (pathname.includes('profile')) {
    currentPathName = '프로필';
  } else if (pathname.includes('/questions')) {
    currentPathName = '질문';
  } else if (groupDashboardRegex.test(pathname)) {
    currentPathName = '그룹 관리';
  } else if (groupEditRegex.test(pathname)) {
    currentPathName = '그룹 수정';
  } else if (groupMembersRegex.test(pathname)) {
    currentPathName = '내 그룹 멤버 보기';
  }
  console.log(currentPathName);

  return (
    <header className="w-full h-[102px] fixed bg-[#fdfdfd] z-50">
      <div className="sm:w-[500px] w-full h-[78px] mt-6 flex justify-between items-center mx-auto">
        <div className="ml-4 font-bold text-lg text-[#8FB6FF]">
          {currentPathName}
        </div>
        <button
          className="mr-3 p-1 rounded-xl active:bg-[#E3EDFF]"
          onClick={handleSideBarToggle}
        >
          <Menu11Icon size={30} color="#8FB6FF" />
        </button>
      </div>

      {isSideBarOpen && (
        <div
          className="bg-black/[.28] w-screen h-screen fixed top-0"
          onClick={closeSideBar}
        ></div>
      )}
      <div
        className={`w-[203px] h-screen fixed top-0 right-0 rounded-l-2xl bg-white transform transition-transform duration-300 z-50 ${isSideBarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="mt-[52px] ml-4 mr-5">
          <div className="flex justify-end">
            <CgClose
              className="w-5 h-5"
              color="#6B6B6B"
              onClick={closeSideBar}
            />
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="font-semibold text-[26px] pd-[10px] text-black">
              Min:i
            </p>
            <Avatar className="w-7 h-7 text-white">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-3 mt-[9px]">
            <div className="mt-[29px]">
              <div className="flex justify-between items-center">
                <p className="font-bold text-xs text-[#626262]">앨범</p>
                <hr className="bg-[#626262] border-t-1 w-[123px] border-dotted"></hr>
              </div>
              <div className="ml-[33px] mt-4 grid grid-cols-3 gap-x-[19px] gap-y-[12px]">
                <Link href={`/groups/${groupId}/albums`}>
                  <div className="flex justify-center items-center flex-col">
                    <BookOpen02Icon color="#85B6FF" />
                    <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                      전체보기
                    </p>
                  </div>
                </Link>
                <div className="flex justify-center items-center flex-col">
                  <BubbleChatNotificationIcon color="#85B6FF" />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    답변하기
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <BubbleChatQuestionIcon color="#85B6FF" />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    질문하기
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <PiClockCounterClockwiseFill color="#85B6FF" size={24} />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    최근컨텐츠
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-[29px]">
              <div className="flex justify-between items-center">
                <p className="font-bold text-xs text-[#626262]">그룹</p>
                <hr className="bg-[#626262] border-t-1 w-[123px] border-dotted"></hr>
              </div>
              <div className="ml-[33px] mt-4 grid grid-cols-3 gap-x-[19px] gap-y-[12px]">
                <div className="flex justify-center items-center flex-col">
                  <UserGroupIcon color="#85B6FF" />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    그룹 보기
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <AddTeamIcon color="#85B6FF" />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    참여하기
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <DashboardSquareAddIcon color="#85B6FF" />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    그룹 만들기
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <Mail01Icon color="#85B6FF" />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    초대하기
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-[29px]">
              <div className="flex justify-between items-center">
                <p className="font-bold text-xs text-[#626262]">설정</p>
                <hr className="bg-[#626262] border-t-1 w-[123px] border-dotted"></hr>
              </div>
              <div className="ml-[33px] mt-4 grid grid-cols-3 gap-x-[19px] gap-y-[12px]">
                <div className="flex justify-center items-center flex-col">
                  <Settings02Icon color="#85B6FF" />
                  <p className="font-extrabold text-[6px] text-[#626262] mt-[5px]">
                    설정하기
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Gnb;
