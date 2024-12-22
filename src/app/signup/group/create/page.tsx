'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import LoginHeader from '@/components/LoginHeader';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import Theme from './_components/Theme';

import '../../verifyInputStyle.css';

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from '../../../../components/embla/EmblaCarouselButtons';
import {
  DotButton,
  useDotButton,
} from '../../../../components/embla/EmblaCarouselDotButton';
import '../../../../components/embla/embla.css';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const FirstCreateGroup = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const [isProfileUploaded, setIsProfileUploaded] = useState(false);
  const [isNamed, setIsNamed] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
      setIsProfileUploaded(true);
    }
  };

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    const nameInput = document.getElementById('name') as HTMLInputElement;

    const validateForm = () => {
      const isNameValid = nameInput.validity.valid;
      setIsNamed(isNameValid);
    };

    nameInput.addEventListener('input', validateForm);
  }, []);

  return (
    <main>
      <LoginHeader></LoginHeader>
      <div
        className="embla__dots mb-[25px]"
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
        <section ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {/* 그룹 이미지, 이름 설정 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={0}>
              <h2 className="text-[28px] font-bold mb-4 text-center mb-[27px]">
                그룹을 <br></br> 만들어 봐요
              </h2>
              <div
                style={{
                  backgroundImage: profileImg ? `url(${profileImg})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="cursor-pointer w-[177px] h-[177px] rounded-full border-4 border-[#4848F9] flex items-center justicy-center mb-[44px]"
              >
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-[177px] h-[177px] rounded-full cursor-pointer opacity-0"
                />
              </div>

              <FormInput
                id="name"
                type="text"
                placeholder="그룹 이름을 정해주세요."
                action=""
                method=""
                errorMessage="그룹 이름을 정해주세요."
                InputTextSize="25px"
                InputLineHeight="43px"
              ></FormInput>
              <div className="fixed bottom-[6%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled || !isProfileUploaded || !isNamed}
                >
                  계속하기
                </NextButton>
              </div>
            </div>

            {/* 앨범 테마 선택 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={1}>
              <h2 className="text-[28px] font-bold mb-4 text-center mb-[21px]">
                앨범 테마를 <br></br> 선택해주세요
              </h2>
              <p className="text-[16px] font-semibold text-[#858585] text-center">
                앨범의 테마에 따라<br></br>AI의 질문 추천? 이 달라져요?
              </p>
              <Theme></Theme>
              <div className="fixed bottom-[6%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled || !isProfileUploaded}
                >
                  계속하기
                </NextButton>
              </div>
            </div>

            {/* 초대코드 단계 */}
            <div
              className="min-w-full p-4 flex flex-col items-center mt-[100px]"
              key={2}
            >
              <h2 className="text-[30px] font-bold mb-3 text-center">
                초대코드
              </h2>
              <p className="text-[16px] text-[#858585] mb-[14px]">
                앨범을 공유할 가족을 초대해보세요!
              </p>
              <p className="text-[64px] text-[#4848F9]">325814</p>
              <div className="fixed bottom-[6%]">
                <Button asChild className="mb-[33px] bg-[#FEE500] text-black">
                  <Link href={'/'}>공유하기</Link>
                </Button>
                <Button asChild>
                  <Link href={'/home'}>시작하기</Link>
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
        </section>
      </article>
    </main>
  );
};

export default FirstCreateGroup;
