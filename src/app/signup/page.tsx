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

import { registerUser, sendVerifyCode, verifyEmailCode } from '@/services/auth';
import useUserStore from '@/store/useUserInfo';
import { userLogin } from '@/services/auth';
import axios from 'axios';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const signup = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);

  const [terms, setTerms] = useState(false);

  const popupTerms = () => {
    setTerms((prev) => !prev);
    console.log('팝업');
  };

  const [isEmailBtnEnabled, setIsEmailBtnEnabled] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [isProfileUploaded, setIsProfileUploaded] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleVerifyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailVerificationCode(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImgFile(file);
      setProfileImg(URL.createObjectURL(file));
      setIsProfileUploaded(true);
      console.log('Selected file:', file);
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

  const handleSendVerificationCode = async () => {
    try {
      const userData = {
        email,
      };

      const response = await sendVerifyCode(userData);
      alert('이메일이 전송되었습니다.');
      console.log('Send API Response:', response);
    } catch (error: any) {
      console.error('Signup failed', error);
      alert(`${error.message}`);
    }
  };
  const handleVerifyEmailCode = async () => {
    try {
      const userData = {
        emailVerificationCode,
      };

      const response = await verifyEmailCode(userData);
      setEmailVerify(true);
      console.log('Signsup success', userData, response);
    } catch (error) {
      console.error('Signup failed', error);
      alert('코드가 유효하지 않습니다.');
    }
  };

  const { fetchUserInfo } = useUserStore();
  const handleLogin = async () => {
    try {
      const userData = {
        email: email,
        password: password,
        rememberMe: false,
      };

      console.log('Login request data:', userData);
      const result = await userLogin(userData);
      fetchUserInfo();
      console.log('Login success:', result);
    } catch (error: any) {
      console.error('Login failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        error: error,
      });

      // 서버에서 전달하는 에러 메시지 처리
      let errorMessage = '로그인에 실패했습니다.';

      if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error.response?.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await registerUser({
        email,
        password,
        name,
        profileImage: profileImgFile || undefined,
      });
      console.log('Signup success:', response);

      await handleLogin();

      if (response.status === 'success') {
        console.log('회원가입이 완료되었습니다.');
      }
    } catch (error: any) {
      console.error('Signup failed:', error);
      const errorMessage =
        error.response?.data?.message || '회원가입에 실패했습니다.';
      alert(errorMessage);
    }
  };

  return (
    <main>
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
      <article
        className="max-w-md mx-auto"
        style={{ height: `calc(100vh - var(--ForGnbmarginTop) - 114px)` }}
      >
        <section ref={emblaRef} className="overflow-hidden h-full">
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
                onChange={handleNameChange}
              ></FormInput>

              <h2 className="text-[22px] font-bold mb-[18px] w-[92%] mt-2">
                이메일을 입력해주세요
              </h2>
              <div className="flex">
                <FormInput
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  action=""
                  method=""
                  errorMessage="정확한 이메일을 입력해주세요"
                  id="email"
                  onChange={handleEmailChange}
                  Inputwidth="243px"
                  disabled={emailVerify}
                ></FormInput>

                <Button
                  size={'verify'}
                  className="ml-[17px]"
                  onClick={handleSendVerificationCode}
                  disabled={emailVerify}
                >
                  전송
                </Button>
              </div>

              <div className="flex">
                <FormInput
                  type="text"
                  placeholder="인증코드를 입력해주세요"
                  action=""
                  method=""
                  errorMessage="6자리로 입력해주세요"
                  id="verifyEmail"
                  onChange={handleVerifyCodeChange}
                  Inputwidth="243px"
                  disabled={emailVerify}
                ></FormInput>

                <Button
                  size={'verify'}
                  className="ml-[17px]"
                  onClick={handleVerifyEmailCode}
                  disabled={emailVerify}
                >
                  인증
                </Button>
              </div>

              <div className="fixed bottom-[10%]">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled || !emailVerify}
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
                onChange={handlePasswordChange}
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
                  // disabled={nextBtnDisabled || !isProfileUploaded}
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
                <Button asChild className="mb-[33px]" onClick={handleSignup}>
                  <Link href={'/signup/join'}>네, 받았어요</Link>
                </Button>
                <Button asChild onClick={handleSignup}>
                  <Link href={'/signup/group/create'}>아니요! 없어요</Link>
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

export default signup;
