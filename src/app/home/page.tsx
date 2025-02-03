'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useUserStore from '@/store/useUserInfo';
import '../../components/embla/embla.css';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

const home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const { userInfo } = useUserStore();

  return (
    <div className="mb-[103px]">
      <header className="h-[226px] bg-[#E5EDFF] w-full">
        <div className="ml-5">
          <Image
            src="/images/민니로고2.png"
            alt="민니"
            width={120}
            height={66}
            className="pt-8"
          ></Image>
          <div className="mt-3 font-semibold">
            <p className="text-[12px]">
              반가워요 {userInfo?.name || 'User'}님!
            </p>
            <p className="text-[20px]">오늘도 좋은 하루 보내세요!</p>
          </div>
          <div className="mt-[18px] w-fit">
            <Button
              asChild
              className="w-[150px] h-[44px] font-bold text-[16px]"
            >
              <Link href="answers">답변하러 가기 →</Link>
            </Button>
            <div className="rounded-full bg-[#FFFFBF] w-7 h-7 text-center font-semibold text-[16px] leading-7 relative bottom-[57px] left-[134px]">
              7
            </div>
          </div>
        </div>
        <div className="absolute top-[35px] right-[20px] flex flex-col justify-center items-center cursor-pointer">
          <Avatar className="w-10 h-10 text-white">
            <AvatarImage
              src={userInfo?.profileImgUrl || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="mt-[6px] font-regular text-[10px]">그룹 이름</p>
        </div>
      </header>
      <main className="ml-[28px]">
        <article>
          <div className="mt-[47px] ml-[3px] mb-[21px] flex flex-row w-[92%] justify-between items-end">
            <p className="font-bold text-[28px] drop-shadow-md">
              {userInfo?.name || 'User'}의 앨범
            </p>
          </div>
          <article className="w-fit mx-auto">
            <Link href="/albums">
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
            <Link
              href="/albums"
              className="font-semibold text-[10px] text-[#676767] mb-[2px]"
            >
              전체보기{'>'}
            </Link>
          </div>
          <div ref={emblaRef} className="overflow-hidden h-[141px]">
            <div className="flex">
              <div className="min-w-[183px] flex flex-col items-center" key={0}>
                <div className='bg-[url("/images/example2.png")] w-[168px] h-[141px] bg-cover cursor-pointer'></div>
              </div>
              <div className="min-w-[183px] flex flex-col items-center" key={1}>
                <div className='bg-[url("/images/example2.png")] w-[168px] h-[141px] bg-cover cursor-pointer'></div>
              </div>
              <div className="min-w-[183px] flex flex-col items-center" key={2}>
                <div className='bg-[url("/images/example2.png")] w-[168px] h-[141px] bg-cover cursor-pointer'></div>
              </div>
              <div className="min-w-[183px] flex flex-col items-center" key={3}>
                <div className='bg-[url("/images/example2.png")] w-[168px] h-[141px] bg-cover cursor-pointer'></div>
              </div>
              <div className="min-w-[183px] flex flex-col items-center" key={4}>
                <div className='bg-[url("/images/example2.png")] w-[168px] h-[141px] bg-cover cursor-pointer'></div>
              </div>
              <div className="min-w-[183px] flex flex-col items-center" key={5}>
                <div className='bg-[url("/images/example2.png")] w-[168px] h-[141px] bg-cover cursor-pointer'></div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-[291px] left-[-28px] relative flex justify-center w-screen">
          <section className="absolute top-[84px] flex flex-col">
            <Button asChild variant={'homeBtn'} size={'homeBtn'}>
              <Link href="/uploads/member">질문 만들러 가기</Link>
            </Button>
            <Button
              asChild
              variant={'homeBtn'}
              size={'homeBtn'}
              className="my-[25px]"
            >
              <Link href="invite">초대하기</Link>
            </Button>
            <Button asChild variant={'homeBtn'} size={'homeBtn'}>
              <Link href="invite">참가하기</Link>
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default home;
