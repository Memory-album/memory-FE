'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import LoginHeader from '@/components/LoginHeader';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import { Checkbox } from '@/components/ui/checkbox';

import { userLogin } from '@/services/auth';
import axios from 'axios';

const login = () => {
  const router = useRouter();
  const [isBtnEnabled, setIsBtnEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        email: email.trim(),
        password: password,
        rememberMe: rememberMe
      };
      
      console.log('Login request data:', userData);
      const result = await userLogin(userData);
      console.log('Login success:', result);

      if (result.status === 'warning') {
        alert(result.message); // 계정 비활성화 등의 경고 메시지
      } else if (result.status === 'success') {
        try {
          // /user/home 엔드포인트 요청
          const homeResponse = await axios.get('http://localhost:8080/user/home', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (homeResponse.status === 200) {
            console.log('Home response:', homeResponse.data);
            router.push('/home');
          }
        } catch (homeError: any) {
          console.error('Home redirect failed:', {
            status: homeError.response?.status,
            data: homeError.response?.data,
            error: homeError
          });
          if (homeError.response?.status === 401) {
            alert('로그인이 필요한 서비스입니다. 다시 로그인해주세요.');
          } else {
            alert(homeError.response?.data?.message || '홈 페이지로 이동하는 중 오류가 발생했습니다.');
          }
        }
      }
      
    } catch (error: any) {
      console.error('Login failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        error: error
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
      
      // 입력 필드 초기화 여부 결정
      if (errorMessage.includes('없는 이메일')) {
        setEmail('');
        setPassword('');
      } else if (errorMessage.includes('비밀번호가 틀렸')) {
        setPassword('');
      }
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

            <div className="flex items-center space-x-2 self-start mt-2 mb-4">
              <Checkbox 
                id="rememberMe" 
                checked={rememberMe}
                onCheckedChange={(checked: boolean) => setRememberMe(checked)}
              />
              <label htmlFor="rememberMe">
                자동 로그인
              </label>
            </div>

            <Button
              className="mt-[20px] mb-[13px]"
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
