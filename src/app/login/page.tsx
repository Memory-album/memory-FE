'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import LoginHeader from '@/components/LoginHeader';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';

import { userLogin } from '@/services/auth';

const login = () => {
  const [isBtnEnabled, setIsBtnEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('pass') as HTMLInputElement;

    const validateForm = () => {
      const isEmailValid = emailInput.validity.valid;
      const isPasswordValid = passwordInput.validity.valid;

      setIsBtnEnabled(isEmailValid && isPasswordValid);
    };

    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
  }, []);

  const handleLogin = async () => {
    try {
      const userData = {
        email,
        password,
      };
      const response = await userLogin(userData);
      console.log('Signsup success', userData, response);
    } catch (error) {
      console.error('Signup failed', error);
      alert('로그인 실패');
    }
  };

  return (
    <main>
      <LoginHeader />
      <article className="w-[315px] mx-auto ForGnbmarginTop">
        <div>
          <p className="font-bold text-[32px] text-[#4E76D6]">
            다 함께 <br /> 추억을 쌓아볼까요?
          </p>
        </div>

        <section className="mt-[83px]">
          <p className="font-semibold text-[14px] text-[#8D8D8D] mb-[25px]">
            먼저 로그인이 필요해요 :)
          </p>
          <div className="flex justify-center items-center flex-col">
            <FormInput
              id="email"
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              errorMessage="정확한 이메일을 입력해주세요"
              action=""
              method=""
              onChange={(e) => setEmail(e.target.value)}
            ></FormInput>

            <FormInput
              id="pass"
              type="password"
              placeholder="비밀번호를 입력 해주세요"
              errorMessage="8자 이상으로 입력해주세요"
              minLength={8}
              action=""
              method=""
              onChange={(e) => setPassword(e.target.value)}
            ></FormInput>

            <Button
              className="mt-[40px] mb-[13px]"
              disabled={!isBtnEnabled}
              onClick={handleLogin}
            >
              로그인
            </Button>
            <div className="w-[132px] border-b-[1px] border-[#8D8D8D] mb-[67px]">
              <Link
                href="/"
                className="text-[12px] font-semibold text-[#8D8D8D]"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Button
              variant={'loginBtn'}
              className="mb-[18px] bg-[#FEE500] text-[#191919] rounded-[12px]"
            >
              <img
                src="/images/kakao.svg"
                alt="kakao"
                className="w-[18px] h-[18px]"
              />
              카카오로 시작하기
            </Button>
            <Button
              variant={'loginBtn'}
              className="mb-[18px] bg-[#03C75A] text-[#FFFFFF] rounded-[12px]"
            >
              <img
                src="/images/naver.svg"
                alt="kakao"
                className="w-[18px] h-[18px]"
              />
              네이버로 시작하기
            </Button>
          </div>
        </section>
      </article>
    </main>
  );
};

export default login;
