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
import TermsOfUse from './_components/TermsOfUse';

import VerificationInput from 'react-verification-input';
import '../signup/verifyInputStyle.css';

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const [terms, setTerms] = useState(false);

  const popupTerms = () => {
    setTerms((prev) => !prev);
    console.log('팝업');
  };

  const [isEmailBtnEnabled, setIsEmailBtnEnabled] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [isProfileUploaded, setIsProfileUploaded] = useState(false);

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
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password',
    ) as HTMLInputElement;
    const verifyPasswordInput = document.getElementById(
      'verifyPassword',
    ) as HTMLInputElement;

    const validateForm = () => {
      const isEmailValid =
        emailInput.validity.valid && nameInput.validity.valid;
      const isPasswordValid =
        passwordInput.value === verifyPasswordInput.value &&
        passwordInput.value !== '';

      setIsEmailBtnEnabled(isEmailValid);
      setIsPasswordEnabled(isPasswordValid);
    };

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    verifyPasswordInput.addEventListener('input', validateForm);
  }, []);

  return (
    <div>
      <TermsOfUse isOpen={terms} onClose={popupTerms}></TermsOfUse>
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
                <div className="fixed bottom-[10%] flex flex-col items-center">
                  <p className="text-[11px] font-semibold text-[#909090] mb-[9px]">
                    시작하기를 누르면{' '}
                    <span
                      onClick={popupTerms}
                      className="relative border-b-[1px] border-[#909090] pb-[1px] cursor-pointer"
                    >
                      이용약관
                    </span>{' '}
                    동의로 간주됩니다
                  </p>
                  <NextButton
                    onClick={onNextButtonClick}
                    disabled={nextBtnDisabled}
                  >
                    시작하기
                  </NextButton>
                </div>
              </div>
            </div>
            {/* 이름, 이메일 설정 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={1}>
              <h2 className="text-[22px] font-bold mb-[21px] w-[92%]">
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

              <h2 className="text-[22px] font-bold mb-[21px] w-[92%]">
                이메일을 입력해주세요
              </h2>
              <FormInput
                type="email"
                placeholder="이메일을 입력해주세요"
                action=""
                method=""
                errorMessage="정확한 이메일을 입력해주세요"
                id="email"
              ></FormInput>
              <div className="fixed bottom-[10%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled || !isEmailBtnEnabled}
                >
                  계속하기
                </NextButton>
              </div>
            </div>

            {/* 비밀번호 설정단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={2}>
              <h2 className="text-[22px] font-bold mb-[21px] w-[92%]">
                비밀번호를 입력해주세요
              </h2>
              <FormInput
                type="password"
                placeholder="비밀번호를 입력해주세요 (8자 이상)"
                action=""
                method=""
                errorMessage="8자리 이상으로 입력해주세요"
                minLength={8}
                id="password"
              ></FormInput>
              <h2 className="text-[22px] font-bold mb-[21px] w-[92%]">
                비밀번호를 확인해주세요
              </h2>
              <FormInput
                type="password"
                placeholder="비밀번호를 확인해주세요"
                action=""
                method=""
                errorMessage="비밀번호가 다릅니다"
                id="verifyPassword"
              ></FormInput>
              <div className="fixed bottom-[10%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled || !isPasswordEnabled}
                >
                  계속하기
                </NextButton>
              </div>
            </div>

            {/* 프로필 설정 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={3}>
              <h2 className="text-[28px] font-bold mb-4 text-center mb-[39px]">
                프로필 사진을 <br></br> 업로드 해주세요
              </h2>
              <div
                style={{
                  backgroundImage: profileImg ? `url(${profileImg})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="cursor-pointer w-[283px] h-[283px] rounded-full border-4 border-[#4848F9] flex items-center justicy-center"
              >
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-[283px] h-[283px] rounded-full cursor-pointer opacity-0"
                />
              </div>
              <div className="fixed bottom-[10%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled || !isProfileUploaded}
                >
                  계속하기
                </NextButton>
              </div>
            </div>

            {/* 초대코드 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={4}>
              <h2 className="text-[30px] font-bold mb-4 text-center">
                초대코드를 <br></br> 받으셨나요?
              </h2>
              <div className="fixed bottom-[8%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                  className="mb-[33px]"
                >
                  계속하기
                </NextButton>
                <Button asChild>
                  <Link href={'/home'}>아니요 바로 시작할래요</Link>
                </Button>
              </div>
            </div>

            {/* 그룹참여 단계 */}
            <div className="min-w-full p-4 flex flex-col items-center" key={5}>
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
            <div className="min-w-full p-4 flex flex-col items-center" key={6}>
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
        </div>
      </div>
    </div>
  );
};

export default signup;
