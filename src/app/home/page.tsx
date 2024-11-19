import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const home = () => {
  return (
    <main>
      <div className="h-[226px] bg-[#E5EDFF] fixed top-0 w-full">
        <div className="ml-5">
          <Image
            src="/images/민니로고2.png"
            alt="민니"
            width={120}
            height={66}
            className="mt-8"
          ></Image>
          <div className="mt-3 font-semibold">
            <p className="text-[12px]">반가워요 user님!</p>
            <p className="text-[20px]">오늘도 좋은 하루 보내세요!</p>
          </div>
          <div className="mt-[18px] w-fit">
            <Button className="w-[150px] h-[44px] font-bold text-[16px]">
              답변하러 가기 →
            </Button>
            <div className="rounded-full bg-[#FFFFBF] w-7 h-7 text-center font-semibold text-[16px] leading-7 relative bottom-[57px] left-[134px]">
              7
            </div>
          </div>
        </div>
        <div className="fixed top-[35px] right-[20px] flex flex-col justify-center items-center">
          <Avatar className="w-10 h-10 text-white">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="mt-[6px] font-regular text-[10px]">그룹 이름</p>
        </div>
      </div>
      <div className="ml-[31px]">
        <div>
          <p>당신의 앨범</p>
          <Link href="">전체보기{'>'}</Link>
        </div>
      </div>
    </main>
  );
};

export default home;
