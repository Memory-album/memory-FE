'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaArrowLeft } from 'react-icons/fa';

import '@/app/signup/verifyInputStyle.css';

import '@/components/embla/embla.css';
import { Button } from '@/components/ui/button';
import { PrevButton } from '@/components/embla/EmblaCarouselButtons';
import { GroupInput } from '@/app/groups/_components/group-input';

import { getGroupById } from '@/features/group/api/getGroupById';

type FormInputs = {
  groupName: string;
  groupDescription: string;
  groupImage?: File | null;
};

type Props = {
  id: string;
};
// TODO: 페이지 반응형
export const EditGroup = ({ id }: Props) => {
  const router = useRouter();
  const [preview, setPreview] = useState<{
    dataUrl: string;
    file: File;
  } | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const {
    data: group,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groups', id],
    queryFn: getGroupById,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 (선택 사항)
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('name', groupNameValue);
      if (preview) {
        formData.append('groupImage', preview.file);
      }
      formData.append('groupDescription', groupDescriptionValue);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/${id}`,
        {
          method: 'put',
          credentials: 'include',
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }

      return response.json();
    },
    onSuccess: () => {
      alert('그룹이 수정되었습니다!');
      router.replace(`/profile`);
    },
    onError: (error) => {
      console.log(error);
      alert('그룹 수정 실패했습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    if (isError) {
      alert('해당 그룹을 찾을 수 없습니다. 프로필 페이지로 이동합니다.');
      router.replace('/profile');
    }
  }, [isError, router]);

  const { control, watch, reset } = useForm();

  const form = useForm<FormInputs>({
    defaultValues: {
      groupName: '',
      groupDescription: '',
    },
  });

  useEffect(() => {
    if (group) {
      reset({
        groupName: group.name || '',
        groupDescription: group.groupDescription || '',
      });
    }
  }, [group, reset]);

  const groupNameValue = watch('groupName');
  const groupDescriptionValue = watch('groupDescription');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ dataUrl: reader.result as string, file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageRef.current) {
      imageRef.current?.click();
    }
  };

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <main>
      <article>
        <section className="overflow-hidden h-full">
          <div>
            <PrevButton
              onClick={() => router.replace(`/groups/${id}/dashboard`)}
              className="w-[34px] h-[34px] text-[34px]"
            >
              <FaArrowLeft className="w-[34px] h-[34px]" />
            </PrevButton>
          </div>
          <FormProvider {...form}>
            <form
              className="flex h-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div
                className="min-w-full p-4 flex flex-col items-center"
                key={0}
              >
                <div
                  onClick={handleClick}
                  className="cursor-pointer w-[177px] h-[177px] rounded-full border-4 border-[#4848F9] flex items-center justicy-center mb-[44px] overflow-hidden"
                >
                  {preview && (
                    <img
                      src={preview.dataUrl}
                      className="block size-full object-cover"
                    />
                  )}
                  <input
                    ref={imageRef}
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={handleImageUpload}
                    className="w-[177px] h-[177px] rounded-full cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <GroupInput
                  name="groupName"
                  label="그룹 이름"
                  control={control}
                  placeholder={group?.name || '우리 가족 앨범'}
                  defaultValue={group?.name}
                  errorMessage="그룹 이름을 입력해주세요."
                />
                <GroupInput
                  name="groupDescription"
                  label="그룹 설명"
                  control={control}
                  placeholder={
                    group?.groupDescription || '예) 가족 테마, 우정 테마'
                  }
                  defaultValue={group?.groupDescription}
                  errorMessage="그룹에 대한 설명을 입력해주세요."
                />
                {mutation.isPending ? (
                  <Button type="button" disabled className="cursor-not-allowed">
                    수정 중...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={
                      preview === null ||
                      groupNameValue.length === 0 ||
                      groupDescriptionValue.length === 0
                    }
                  >
                    수정하기
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </section>
      </article>
    </main>
  );
};
