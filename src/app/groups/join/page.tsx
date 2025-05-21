'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import VerificationInput from 'react-verification-input';

import '@/app/signup/verifyInputStyle.css';
import { Button } from '@/components/ui/button';
import { PrevButton } from '@/components/embla/EmblaCarouselButtons';

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
      const response = await fetch(`/api/api/v1/groups/join`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // ✅ JSON 데이터임을 명시!
        },
        body: JSON.stringify({ inviteCode, groupNickname }),
      });

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
    <div className="w-full h-full sm:w-[500px] bg-[#FAFCFF] sm:mx-auto">
      <div>
        <PrevButton
          onClick={() => router.replace('/profile')}
          className="w-[34px] h-[34px] text-[34px]"
        >
          <FaArrowLeft className="w-[34px] h-[34px]" />
        </PrevButton>
      </div>
      <div className="flex flex-col h-full justify-around">
        {/* 그룹참여 단계 */}
        <div className="p-4 flex flex-col items-center">
          <div>
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
    </div>
  );
};

export default join;
