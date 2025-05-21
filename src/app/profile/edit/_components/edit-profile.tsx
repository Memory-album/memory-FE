'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, ChevronLeft } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { User as UserType } from '@/model/user';

type ProfileImageState = {
  type: 'remote' | 'local';
  url: string;
  file?: File;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: '이름을 입력해주세요.',
  }),
});

interface Props {
  user: UserType;
}

export const EditProfile = ({ user }: Props) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<ProfileImageState | null>({
    type: 'remote',
    url: user.profileImgUrl,
  });

  // 폼 설정
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const formData = new FormData();
      const userUpdateDto = { name: name };
      formData.append(
        'userUpdateDto',
        new Blob([JSON.stringify(userUpdateDto)], {
          type: 'application/json',
        }),
      );

      if (profileImage?.type === 'local' && profileImage.file) {
        formData.append('profileImage', profileImage.file);
      }

      const response = await fetch(`/api/user/update`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('프로필 수정에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: async (response) => {
      alert('프로필이 수정되었습니다.');
      router.replace('/profile');
    },
    onError: (error) => {
      console.log(error);
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfileImage({
        type: 'local',
        url: objectUrl,
        file: file,
      });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values.name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <header className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-4">
          <button
            type="button"
            className="flex items-center text-gray-700"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-medium text-lg">기본 프로필 수정</h1>
          <button
            type="submit"
            className="text-blue-500 font-medium"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '저장 중...' : '저장'}
          </button>
        </header>
        <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
          {/* 프로필 이미지 섹션 */}
          <FormItem className="flex flex-col items-center mb-8">
            <FormLabel className="sr-only">프로필 이미지</FormLabel>
            <div className="relative mb-4">
              <Avatar className="w-28 h-28 border border-gray-200">
                {profileImage?.url ? (
                  <AvatarImage src={profileImage.url} alt="프로필 이미지" />
                ) : (
                  <AvatarFallback className="bg-gray-100 text-gray-500">
                    {user?.name?.slice(0, 2) || ''}
                  </AvatarFallback>
                )}
              </Avatar>
              <FormControl>
                <div className="absolute bottom-0 right-0">
                  <label
                    htmlFor="profileImage"
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full border border-gray-200 cursor-pointer shadow-sm hover:bg-gray-50"
                  >
                    <Camera className="w-5 h-5 text-gray-600" />
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </FormControl>
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel className="font-semibold">이름</FormLabel>
                <FormControl>
                  <Input className="h-[36px] rounded-[5px]" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            render={() => (
              <FormItem>
                <FormLabel className="font-semibold">이메일</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    value={user?.email || ''}
                    className="bg-gray-100 text-gray-700 h-[36px] rounded-[5px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* 구분선 */}
          <div className="mt-8 border-t border-gray-200"></div>

          <Link
            className="w-full flex justify-between items-center h-14 mb-4"
            href="/password-change"
          >
            <span className="text-blue-500 text-[14px] hover:text-blue-600">
              비밀번호 변경하기
            </span>
          </Link>
        </main>
      </form>
    </Form>
  );
};
