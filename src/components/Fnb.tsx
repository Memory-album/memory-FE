'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useUserStore from '@/store/useUserInfo';
import useAlbumStore from '@/store/useAlbumStore';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Album02Icon } from 'hugeicons-react';
import { Home11Icon } from 'hugeicons-react';
import { FavouriteIcon } from 'hugeicons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect } from 'react';

const Fnb = () => {
  const pathname = usePathname();
  const excludeLayoutRoutes = [
    '/',
    '/login',
    '/signup',
    '/signup/join',
    '/signup/group/create',
    '/answers',
    '/groups/create',
  ];

  // 추가된 패턴
  const dynamicRouteGroupPatterns = [
    /^\/groups\/[^\/]+\/albums\/[^\/]+\/upload$/,
    /^\/groups\/[^\/]+\/albums\/[^\/]+\/answers\/[^\/]+$/,
  ];

  if (
    excludeLayoutRoutes.includes(pathname) ||
    dynamicRouteGroupPatterns.some((pattern) => pattern.test(pathname))
  ) {
    return null;
  }
  const { userInfo, fetchUserInfo } = useUserStore();
  const groupId = userInfo?.currentGroupId;
  const { hasAlbums, fetchAlbums } = useAlbumStore();

  useEffect(() => {
    const loadData = async () => {
      if (!userInfo) {
        await fetchUserInfo();
      }
      if (userInfo?.currentGroupId) {
        await fetchAlbums();
      }
    };
    loadData();
  }, [userInfo, fetchAlbums, fetchUserInfo]);

  const handleUploadClick = (e: React.MouseEvent) => {
    if (!userInfo?.currentGroupId) {
      e.preventDefault();
      alert('로그인이 필요합니다.');
      return;
    }

    if (!hasAlbums) {
      e.preventDefault();
      alert('앨범을 먼저 추가해주세요');
      window.location.href = `/groups/${userInfo.currentGroupId}/albums`;
    }
  };

  return (
    <footer className="w-full h-[87px] fixed bottom-0 left-0 right-0 z-40">
      <div className="w-full h-16 fixed bottom-0 left-0 right-0 bg-[#DAE2FF] rounded-t-[14px]">
        <div
          className="flex grid-cols-5"
          style={{
            gap: 'calc(100vw / 24)',
            padding: '12px calc(100vw / 14)',
          }}
        >
          <Link
            href="/home"
            className="flex flex-col text-[10px] font-medium text-[#4848f9] justify-center items-center"
            style={{ width: 'calc(100vw / 8.7)' }}
          >
            <Home11Icon
              className={`w-8 h-8 ${pathname === '/home' ? 'text-[#4848F9]' : 'text-white'}`}
            />
            <p className="mt-[2px]">메인</p>
          </Link>
          <Link
            href={`/groups/${groupId}/albums`}
            className="flex flex-col text-[10px] font-medium text-[#4848f9] justify-center items-center"
            style={{ width: 'calc(100vw / 8.7)' }}
          >
            <FavouriteIcon
              className={`w-8 h-8 ${pathname === '/likes' ? 'text-[#4848F9]' : 'text-white'}`}
            />
            <p className="mt-[2px]">좋아요</p>
          </Link>
          <div
            // className="ml-[94px]"
            style={{ margin: '0 calc(100vw / 8.3)' }}
          ></div>
          <Link
            href="/groups/1/albums"
            className="flex flex-col text-[10px] font-medium text-[#4848f9] justify-center items-center"
            style={{ width: 'calc(100vw / 8.7)' }}
          >
            <Album02Icon
              className={`w-8 h-8 ${pathname === '/groups/1/albums' ? 'text-[#4848F9]' : 'text-white'}`}
            />
            <p className="mt-[2px]">앨범</p>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col text-[10px] font-medium text-[#4848f9] justify-center items-center"
            style={{ width: 'calc(100vw / 8.7)' }}
          >
            <Avatar className="w-8 h-8 text-white">
              <AvatarImage
                src={userInfo?.profileImgUrl || 'https://github.com/shadcn.png'}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mt-[2px]">{userInfo?.name || 'User'}</p>
          </Link>
        </div>
      </div>
      <div
        className="w-[70px] h-[45px] fixed bottom-[42px]  rounded-tl-full rounded-tr-full"
        style={{ left: 'calc(50% - 35px)' }}
      >
        <svg width="70" height="45" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="35" cy="23" rx="35" ry="23" fill="#DAE2FF" />
        </svg>
      </div>

      <Link
        href={
          hasAlbums
            ? `/groups/${groupId}/albums/select`
            : `/groups/${groupId}/albums`
        }
        className="fixed bottom-[32px]"
        style={{ left: 'calc(50% - 1.5rem)' }}
        onClick={handleUploadClick}
      >
        <BsPlusCircleFill className="w-12 h-12 text-[#4848f9] bg-white rounded-full "></BsPlusCircleFill>
      </Link>
    </footer>
  );
};

export default Fnb;
