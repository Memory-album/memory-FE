'use client';

import LoginHeader from '@/components/LoginHeader';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

import VerificationInput from 'react-verification-input';
import '../verifyInputStyle.css';

const invite = () => {
  return (
    <main>
      <LoginHeader></LoginHeader>
      <article className="max-w-md mx-auto w-fit mt-[281px]">
        <div>
          <div>
            {/* 그룹참여 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center mb-[229px]">
              <div className="">
                <h2 className="text-[30px] font-bold mb-[6px] text-center">
                  그룹에 참여하기
                </h2>
                <p className="font-medium text-[16px] text-[#858585] text-center mb-[34px]">
                  아래에 코드를 입력해주세요
                </p>
                <VerificationInput
                  classNames={{
                    container: 'container',
                    character: 'character',
                    characterInactive: 'character--inactive',
                    characterSelected: 'character--selected',
                    characterFilled: 'character--filled',
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Link href={'/home'}>
                <Button>시작하기</Button>
              </Link>
            </div>
          </div>
          <div className="fixed top-[54px] left-[27px]">
            <button
              className="w-[34px] h-[34px] text-[34px]"
              onClick={history.back}
            >
              <FaArrowLeft className="w-[34px] h-[34px]" />
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default invite;
