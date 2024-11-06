'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import LoginHeader from '@/components/LoginHeader';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa6';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './_components/EmblaCarouselButtons';
import { DotButton, useDotButton } from './_components/EmblaCarouselDotButton';
import '../signup/embla.css';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const signup = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div>
      <LoginHeader></LoginHeader>
      <div
        className="embla__dots mb-[42px]"
        style={{ marginTop: 'calc(var(--ForGnbmarginTop) + 39px)' }}
      >
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : '',
            )}
          />
        ))}
      </div>
      <div
        className="max-w-md mx-auto"
        style={{ height: `calc(100vh - var(--ForGnbmarginTop) - 114px)` }}
      >
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            <div className="min-w-full p-4 flex flex-col items-center" key={0}>
              <Image src="/images/mini.svg" alt="" width={210} height={83} />
              <p className="text-[32px] text-[#4E76D6] font-extrabold mt-[29px]">
                추억을 쌓아보세요
              </p>
              <div className="fixed bottom-[6%] flex flex-col justify-center items-center">
                <p className="text-[11px] font-semibold text-[#909090] mb-[9px]">
                  시작하기를 누르면 이용약관 동의로 간주됩니다
                </p>
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                >
                  시작하기
                </NextButton>
              </div>
            </div>
            <div className="min-w-full p-4 flex flex-col items-center" key={1}>
              <h2 className="text-xl font-bold mb-4">
                당신의 이름을 알려주세요
              </h2>
              <FormInput
                id="name"
                type="text"
                placeholder="이름을 입력해주세요"
                action=""
                method=""
                errorMessage="이름을 입력해주세요"
              ></FormInput>
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              >
                계속하기
              </NextButton>
            </div>

            {/* 이메일 입력 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={2}>
              <h2 className="text-xl font-bold mb-4">이메일을 입력해주세요</h2>
              <FormInput
                type="text"
                placeholder="이메일을 입력해주세요"
                action=""
                method=""
                errorMessage="정확한 이메일을 입력해주세요"
                id="email"
              ></FormInput>
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              >
                계속하기
              </NextButton>
            </div>

            {/* 비밀번호 입력 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={3}>
              <h2 className="text-xl font-bold mb-4">
                비밀번호를 입력해주세요
              </h2>
              <FormInput
                type="text"
                placeholder="비밀번호를 입력해주세요 (6자 이상)"
                action=""
                method=""
                errorMessage="6자리 이상으로 입력해주세요"
                id="password"
              ></FormInput>
              <h2 className="text-xl font-bold mb-4">
                비밀번호를 확인해주세요
              </h2>
              <FormInput
                type="text"
                placeholder="비밀번호를 확인해주세요"
                action=""
                method=""
                errorMessage="비밀번호가 다릅니다"
                id="verifyPassword"
              ></FormInput>
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              >
                계속하기
              </NextButton>
            </div>

            {/* 프로필 사진 추가 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={4}>
              <h2 className="text-xl font-bold mb-4">
                프로필을 업로드 해주세요
              </h2>
              <input type="file" className="border p-2 mb-4 w-full" />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              >
                계속하기
              </NextButton>
            </div>
            <div className="min-w-full p-4 flex flex-col items-center" key={5}>
              <h2 className="text-xl font-bold mb-4">초대코드를 받으셨나요?</h2>
              <Button>네</Button>
              <Button>아니요 바로 시작할래요</Button>
            </div>
          </div>
          <div className="fixed top-[54px] left-[27px]">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="w-[34px] h-[34px] text-[34px]"
            >
              <FaArrowLeft className="w-[34px] h-[34px]" />
            </PrevButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
