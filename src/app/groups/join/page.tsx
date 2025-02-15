'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

import VerificationInput from 'react-verification-input';
import '@/app/signup/verifyInputStyle.css';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const join = () => {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState<string | null>(null);
  // TODO: groupNickname 필드 삭제
  const mutation = useMutation({
    mutationFn: async ({
      inviteCode,
      groupNickname,
    }: {
      inviteCode: string;
      groupNickname: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/join`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // ✅ JSON 데이터임을 명시!
          },
          body: JSON.stringify({ inviteCode, groupNickname }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }

      return response.json();
    },
    onSuccess: () => {
      router.replace('/home');
      alert('그룹으로 이동합니다.');
    },
    onError: (error) => {
      console.error(error);
      alert('유효하지 않은 코드입니다. 다시 시도해주세요.');
    },
  });

  const handleComplete = (value: string) => {
    setJoinCode(value);
  };

  return (
    <main>
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
                  onComplete={handleComplete}
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
              <Button
                disabled={joinCode === null || joinCode!.length !== 6}
                onClick={() =>
                  mutation.mutate({
                    inviteCode: joinCode as string,
                    groupNickname: '',
                  })
                }
              >
                시작하기
              </Button>
            </div>
          </div>
          <div className="fixed top-[54px] left-[27px]">
            <button
              className="w-[34px] h-[34px] text-[34px]"
              onClick={() => router.replace('/profile')}
            >
              <FaArrowLeft className="w-[34px] h-[34px]" />
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default join;
