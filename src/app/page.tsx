import Link from 'next/link';

import { Button } from '@/components/ui/button';

const WelcomePage = () => {
  return (
    <main>
      <div className="w-[280px] h-[84px] mx-auto mb-[16px]">
        <img src="/images/mini.svg" alt="logo" className="w-[180px] h-[84px]" />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[280px]">
          <p className="text-[#3567DC] font-extrabold text-[20px]">
            시작하실 준비가 되셨나요? <br /> 당신이 누구인지 알려주세요
          </p>
        </div>

        <div className="grid cols-2 gap-[33px] mt-[69px]">
          <Button asChild>
            <Link href="/login">기존 계정으로 로그인하기</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">회원가입하기</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;
