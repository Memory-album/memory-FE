'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import LoginHeader from '@/components/LoginHeader';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

import VerificationInput from 'react-verification-input';
import '../signup/verifyInputStyle.css';

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from '../../components/embla/EmblaCarouselButtons';
import {
  DotButton,
  useDotButton,
} from '../../components/embla/EmblaCarouselDotButton';
import '../../components/embla/embla.css';
import { useEffect } from 'react';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const invite = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <main>
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
      <article
        className="max-w-md mx-auto"
        style={{ height: `calc(100vh - var(--ForGnbmarginTop) - 114px)` }}
      >
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {/* 그룹참여 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={0}>
              <div className="fixed top-[14%]">
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

              <div className="fixed bottom-[10%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                >
                  계속하기
                </NextButton>
              </div>
            </div>

            {/* 관계입력 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={1}>
              <div className="fixed top-[14%]">
                <h2 className="text-[30px] font-bold mb-[6px] text-center">
                  관계를 입력해주세요
                </h2>
                <p className="font-medium text-[16px] text-[#858585] text-center mb-[34px]">
                  상대방과의 관계를 알려주세요{' '}
                </p>
                <FormInput
                  type="string"
                  placeholder="관계를 알려주세요"
                  action=""
                  method=""
                  errorMessage="관계를 알려주세요"
                  id="retlation"
                ></FormInput>
              </div>
              <div className="fixed bottom-[10%]">
                <Button
                  onClick={() => {
                    window.location.replace('/home');
                  }}
                >
                  시작하기
                </Button>
              </div>
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
      </article>
    </main>
  );
};

export default invite;
