'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useUserStore from '@/store/useUserInfo';
import useGroupStore from '@/store/useGroupStore';
import '../../components/embla/embla.css';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowDataTransferHorizontalIcon } from 'hugeicons-react';
import { MdLogout } from 'react-icons/md';
import { EmblaOptionsType } from 'embla-carousel';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InviteCodeDialog } from '@/components/invite-code-dialog';
import { handleLogout } from '@/services/auth';

interface UploadedBy {
  id: number;
  name: string;
  profileImgUrl: string;
}

interface MediaItem {
  id: number;
  fileUrl: string;
  fileType: string;
  originalFilename: string;
  fileSize: number;
  thumbnailUrl: string;
  uploadedBy: UploadedBy;
  createdAt: string;
  story: string;
}

interface Album {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  recentMedia: MediaItem[];
}

const home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const { userInfo } = useUserStore();
  const { group, fetchGroup } = useGroupStore();
  const [recentMedia, setRecentMedia] = useState<MediaItem[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('');
  const groupId = userInfo?.currentGroupId;
  const [hasAlbums, setHasAlbums] = useState<boolean>(true);
  const logoutRef = useRef<HTMLDivElement>(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false);
  const router = useRouter();

  const toggleVisibillity = () => {
    setIsLogoutVisible(!isLogoutVisible);
    if (logoutRef.current) {
      logoutRef.current.style.display = !isLogoutVisible ? 'flex' : 'none';
    }
  };

  const onLogout = async () => {
    const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
    if (isConfirmed) {
      await handleLogout(router);
    }
  };

  useEffect(() => {
    const checkAlbums = async () => {
      if (!groupId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/albums/group/${groupId}`,
          {
            method: 'get',
            credentials: 'include',
          },
        );
        const data = await response.json();
        setHasAlbums(data.data.length > 0);
      } catch (error) {
        console.error('Error checking albums:', error);
      }
    };

    checkAlbums();
  }, [groupId]);

  useEffect(() => {
    const fetchAlbums = async () => {
      if (!groupId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/albums/group/${groupId}`,
          {
            method: 'get',
            credentials: 'include',
          },
        );
        const data = await response.json();
        if (data.result === 'SUCCESS') {
          setAlbums(data.data);
          setHasAlbums(data.data.length > 0);
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [groupId]);

  const handleAlbumSelect = (value: string) => {
    setSelectedAlbumId(value);
    router.push(`/groups/${groupId}/albums/${value}/answers`);
  };

  useEffect(() => {
    fetchGroup(groupId ? groupId : 1);

    //최근 미디어
    const fetchRecentMedia = async () => {
      const albumId = 1;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/albums/${albumId}/recent-media?limit=5`,
          {
            method: 'get',
            credentials: 'include',
          },
        );
        const data = await response.json();
        if (data.result === 'SUCCESS') {
          setRecentMedia(data.data);
        }
      } catch (error) {
        console.error('최근 미디어 가져오기 실패:', error);
      }
    };
    fetchRecentMedia();
  }, []);

  return (
    <div className="mb-[103px] mx-auto w-full sm:w-[500px]">
      <header className="h-[226px] bg-[#E5EDFF] w-full relative">
        <div className="ml-5">
          <Image
            src="/images/민니로고2.png"
            alt="민니"
            width={120}
            height={66}
            className="pt-8"
          ></Image>
          <div
            className="absolute top-[35px] right-[20px] flex flex-col justify-center items-center cursor-pointer"
            onClick={toggleVisibillity}
          >
            <Avatar className="w-10 h-10 text-white">
              <AvatarImage
                src={
                  group ? group.groupImageUrl : 'https://github.com/shadcn.png'
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mt-[6px] font-regular text-[10px]">
              {group ? group.name : '그룹이 없습니다'}
            </p>
          </div>
          <div className="mt-3 font-semibold">
            <p className="text-[12px]">
              반가워요 {userInfo?.name || 'User'}님!
            </p>
            <p className="text-[20px]">오늘도 좋은 하루 보내세요!</p>
          </div>
          <div className="mt-[18px] w-fit">
            {hasAlbums ? (
              <Select onValueChange={handleAlbumSelect}>
                <SelectTrigger className="pl-[20px] w-[150px] h-[44px] font-bold text-[16px] rounded-[9px] bg-[#4848F9] border-2 border-[#E5EDFF] hover:bg-[#E5EDFF] hover:text-[#4B6FFF] transition-colors text-white">
                  <SelectValue placeholder="답변하러 가기" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-[#E5EDFF]">
                  {albums.map((album) => (
                    <SelectItem
                      key={album.id}
                      value={album.id.toString()}
                      className="hover:bg-[#E5EDFF] hover:text-[#4B6FFF] cursor-pointer"
                    >
                      {album.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Button
                asChild
                className="w-[150px] h-[44px] font-bold text-[16px] bg-[#4848F9] text-white rounded-[9px] border-2 border-[#E5EDFF] hover:bg-[#E5EDFF] hover:text-[#4B6FFF] transition-colors"
              >
                <Link href={`/groups/${groupId}/albums`}>
                  앨범 만들러 가기 →
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div
          ref={logoutRef}
          className="absolute top-[79px] right-[8px] w-[169px] h-[119px] rounded-[22px] shadow-xl flex flex-col justify-center items-center bg-white"
          style={{ display: 'none' }}
        >
          <Avatar className="w-[50px] h-[50px] text-white">
            <AvatarImage
              src={
                group ? group.groupImageUrl : 'https://github.com/shadcn.png'
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-extrabold text-[13px]">{`${group ? group.name : '그룹이 없습니다'}`}</p>
          <div className="w-[150px] h-[29px] rounded-[11px] bg-[#EEF4FF] flex flex-row justify-around items-center ">
            <div>
              <Link href="/profile" className="flex flex-row">
                <ArrowDataTransferHorizontalIcon size={12} />
                <p className="font-extrabold text-[10px]">그룹변경</p>
              </Link>
            </div>
            <div className="flex flex-row cursor-pointer">
              <MdLogout size={12} />
              <p className="font-extrabold text-[10px]" onClick={onLogout}>
                로그아웃
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="ml-[28px]">
        <article>
          <div className="mt-[47px] ml-[3px] mb-[21px] flex flex-row w-[92%] justify-between items-end">
            <p className="font-bold text-[28px] drop-shadow-md">
              {userInfo?.name || 'User'}님의 앨범
            </p>
          </div>
          <article className="w-fit mx-auto">
            <Link href={`/groups/${groupId}/albums`}>
              <figure className="w-[328px] h-[272px] overflow-hidden relative cursor-pointer group">
                <div className="w-[146px] h-[205px] bg-[#FF8888] opacity-60 rounded-[10px] absolute top-[12px] left-[16px] rotate-[-9deg] z-0 group-hover:top-[20px] group-hover:left-[68px] group-hover:rotate-[-15deg] transition-all"></div>
                <div className="w-[146px] h-[205px] bg-[#FFF68F] opacity-60 rounded-[10px] absolute top-[6px] right-[62px] rotate-[26deg] z-10 group-hover:top-[29px] group-hover:right-[69px] group-hover:rotate-[12deg] transition-all"></div>
                <div className="w-[146px] h-[205px] bg-[#ACFFDE] opacity-60 rounded-[10px] absolute bottom-[-23px] right-[21px] rotate-[37deg] z-20 group-hover:bottom-[2px] group-hover:right-[67px] group-hover:rotate-[43deg] transition-all"></div>
                <div className="w-[146px] h-[205px] bg-[#ABA1FF] opacity-60 rounded-[10px] absolute bottom-[-71px] left-[4px] rotate-[-32deg] z-30 group-hover:bottom-[3px] group-hover:left-[50px] group-hover:rotate-[-32deg] transition-all"></div>
                <Image
                  src="/images/example.png"
                  alt="앨범 메인사진"
                  width={146}
                  height={205}
                  className="rounded-[10px] relative mt-[42px] mb-[25px] mx-auto z-40"
                ></Image>
              </figure>
            </Link>
          </article>
        </article>
        <section className="mt-[45px]">
          <div className="w-[92%] flex flex-row justify-between items-end mb-5">
            <p className="font-bold text-[16px]">최근 추가된 콘텐츠</p>
          </div>
          <div ref={emblaRef} className="overflow-hidden h-[141px]">
            <div className="flex">
              {recentMedia.length > 0 ? (
                recentMedia.map((media) => {
                  return (
                    <div
                      className="min-w-[183px] flex flex-col items-center"
                      key={media.id}
                    >
                      <div
                        className="w-[168px] h-[141px] bg-cover cursor-pointer rounded-[21px]"
                        style={{
                          backgroundImage: `url(${encodeURI(media.fileUrl)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    </div>
                  );
                })
              ) : (
                <div className="min-w-[183px] flex flex-col items-center">
                  <div className="w-[168px] h-[141px] bg-gray-200 flex items-center justify-center rounded-[21px]">
                    <p className="text-gray-500 mx-[10px] text-center">
                      최근 추가된 콘텐츠가 없습니다
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="h-[291px] relative flex justify-center">
          <section className="absolute top-[84px] flex flex-col">
            <Button asChild variant={'homeBtn'} size={'homeBtn'}>
              <Link
                href={
                  hasAlbums
                    ? // ? `/groups/${groupId}/albums/${selectedAlbumId}/upload`
                      `/groups/${groupId}/albums/1/upload`
                    : `/groups/${groupId}/albums`
                }
              >
                질문 만들러 가기
              </Link>
            </Button>
            <Button
              asChild
              variant={'homeBtn'}
              size={'homeBtn'}
              className="my-[25px]"
            >
              <InviteCodeDialog inviteCode={group ? group.inviteCode : '1'}>
                <div className="my-[25px] cursor-pointer w-[328px] h-[52px] px-4 py-2 text-[16px] bg-[#4848f9] text-white rounded-[10px] font-bold hover:bg-[#3d3dcf] shadow-[0_0_10px_1px_rgba(141,146,255,0.42)] inline-flex items-center justify-center">
                  초대하기
                </div>
              </InviteCodeDialog>
            </Button>
            <Button asChild variant={'homeBtn'} size={'homeBtn'}>
              <Link href="groups/join">참가하기</Link>
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default home;
