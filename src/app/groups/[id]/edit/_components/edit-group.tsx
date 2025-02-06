'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { GroupNameField } from '@/app/groups/_components/groupname-field';

type FormInputs = {
  groupname: string;
  groupImage?: File | null;
};

// TODO: 페이지 반응형
export const EditGroup = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('name', groupnameValue);
      if (preview) {
        formData.append('groupImageUrl', preview.file);
      }

      // TODO: 그룹 수정 API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/.........`,
        {
          method: 'post',
          credentials: 'include',
          body: formData,
        },
      );

      return response.json();
    },
    onSuccess: async (response) => {
      alert('그룹이 수정되었습니다!');
      router.replace('/??');
    },
    onError: (error) => {
      console.log(error);
      alert('그룹 수정 실패했습니다. 다시 시도해주세요.');
    },
  });

  const [preview, setPreview] = useState<{
    dataUrl: string;
    file: File;
  } | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const { control, watch } = useForm();

  const form = useForm<FormInputs>({
    defaultValues: {
      groupname: '',
    },
  });

  const groupnameValue = watch('groupname');

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
    <div className="sm:m-auto w-full sm:w-[500px] ForGnbpaddingTop">
      <FormProvider {...form}>
        <form
          className="mt-4 flex flex-col items-center justify-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex-grow flex flex-col justify-center items-center mb-2">
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
            <GroupNameField control={control} />
          </div>
          <div>
            <Button
              type="submit"
              disabled={
                preview === null ||
                groupnameValue === '' ||
                groupnameValue === undefined
              }
            >
              그룹 수정
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
