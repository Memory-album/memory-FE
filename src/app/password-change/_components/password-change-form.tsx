'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CheckCheck, Loader, XIcon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getUser } from '@/features/auth/api/getUser';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const verifyCodeSchema = z.object({
  code: z.string().min(6, { message: '인증 코드를 입력해주세요.' }),
});

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    confirmPassword: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export const PasswordChangeForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>();
  const [verificationCode, setVerificationCode] = useState<string>('');

  // 사용자 정보 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const user = data?.user;

  // 인증 코드 확인 폼
  const verifyCodeForm = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  // 비밀번호 변경 폼
  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // 인증 코드 요청 API 호출
  const requestCodeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/password/reset-request`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '인증 코드 발송에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      setError(null);
      alert('이메일로 인증코드가 발송되었습니다.');
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  // 인증 코드 확인 API 호출
  const verifyCodeMutation = useMutation({
    mutationFn: async (verificationCode: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/password/verify-code`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            verificationCode,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '인증 코드 확인에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setError(null);
      alert('검증 완료되었습니다.');
      setVerificationCode(verifyCodeForm.getValues().code); // 인증 코드 저장
    },
    onError: (error: Error) => {
      setError(error.message);
      alert(error.message);
    },
  });

  // 비밀번호 변경 API 호출
  const changePasswordMutation = useMutation({
    mutationFn: async (data: z.infer<typeof changePasswordSchema>) => {
      if (!authToken) throw new Error('잘못된 요청입니다. 다시 시도해주세요');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/password/reset`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            email: user.email,
            verificationCode,
            newPassword: data.password,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '비밀번호 변경에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      router.replace('/profile');
    },
    onError: (error: Error) => {
      setError(error.message);
      alert(error.message);
    },
  });

  const onRequestCode = () => {
    verifyCodeMutation.reset();
    requestCodeMutation.mutate();
  };

  const onVerifyCode = (data: z.infer<typeof verifyCodeSchema>) => {
    verifyCodeMutation.mutate(data.code);
  };

  const onChangePassword = (data: z.infer<typeof changePasswordSchema>) => {
    changePasswordMutation.mutate(data);
  };

  // 비밀번호 강도 계산 함수
  const calculatePasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '없음', color: 'bg-gray-200' };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength < 2)
      return { strength: 1, label: '약함', color: 'bg-red-500' };
    if (strength < 4)
      return { strength: 2, label: '보통', color: 'bg-yellow-500' };
    return { strength: 3, label: '강함', color: 'bg-green-500' };
  };

  const passwordStrength = calculatePasswordStrength(
    changePasswordForm.watch('password'),
  );

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="size-8 animate-spin text-[#c6c7cb]" />
      </div>
    );
  }

  return (
    <div>
      <header className="sticky top-0 z-10 flex items-center justify-center w-full h-16 px-4">
        <h1 className="font-medium text-lg">비밀번호 변경</h1>
        <button
          type="button"
          className="flex items-center absolute right-4 text-gray-700"
          onClick={() => router.back()}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 px-4 pt-6 pb-[80px] mx-auto w-full">
        <div className="space-y-4 mb-5">
          <Label className="font-semibold">이메일</Label>
          <Input
            disabled
            className="bg-gray-100 text-gray-700 h-[36px] rounded-[5px]"
            value={user.email}
          />
        </div>
        <Form {...verifyCodeForm}>
          <form
            onSubmit={verifyCodeForm.handleSubmit(onVerifyCode)}
            className="space-y-4 mb-5"
          >
            <FormField
              control={verifyCodeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">인증 코드</FormLabel>
                  <p className="text-sm text-gray-600 mb-2">
                    이메일로 발송된 6자리 인증 코드를 입력해주세요.
                  </p>
                  <div className="flex">
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[36px] rounded-[5px] mr-1"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      className={cn(
                        'w-fit h-[36px] border-[1px] border-blue-300 bg-transparent text-blue-300 hover:bg-gray-100/80',
                        verifyCodeMutation.isSuccess && 'cursor-not-allowed',
                      )}
                      disabled={verifyCodeMutation.isPending}
                    >
                      {verifyCodeMutation.isPending && (
                        <Loader className="animate-spin" />
                      )}
                      {verifyCodeMutation.isSuccess ? (
                        <p className="flex">
                          검증 완료 <CheckCheck className="ml-2" />
                        </p>
                      ) : (
                        '확인'
                      )}
                    </Button>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <p
              className="text-sm text-blue-500 hover:underline cursor-pointer"
              onClick={onRequestCode}
            >
              {requestCodeMutation.isPending ? '발송 중...' : '인증 코드 발송'}
            </p>
          </form>
        </Form>

        {verificationCode !== '' && (
          <Form {...changePasswordForm}>
            <form
              onSubmit={changePasswordForm.handleSubmit(onChangePassword)}
              className="space-y-6"
            >
              <FormField
                control={changePasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">새 비밀번호</FormLabel>
                    <p className="text-sm text-gray-600 mb-4">
                      새로운 비밀번호를 입력해주세요.
                      <br />
                      영문, 숫자, 특수문자 조합 8~20자리
                    </p>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="h-[36px] rounded-[5px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* 비밀번호 강도 표시 */}
              {changePasswordForm.watch('password') && (
                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-600 mr-2">
                    비밀번호 강도:
                  </span>
                  <span
                    className={`text-sm ml-2 ${
                      passwordStrength.label === '강함'
                        ? 'text-green-500'
                        : passwordStrength.label === '보통'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                    }`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
              )}
              <FormField
                control={changePasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      비밀번호 확인
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="h-[36px] rounded-[5px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 mt-4"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending
                  ? '변경 중...'
                  : ' 비밀번호 변경'}
              </Button>
            </form>
          </Form>
        )}
      </main>
    </div>
  );
};
