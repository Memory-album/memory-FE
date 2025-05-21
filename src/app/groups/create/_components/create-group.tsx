'use client';

import { useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

import '@/app/signup/verifyInputStyle.css';

import '@/components/embla/embla.css';
import {
  DotButton,
  useDotButton,
} from '@/components/embla/EmblaCarouselDotButton';
import {
  PrevButton,
  usePrevNextButtons,
} from '@/components/embla/EmblaCarouselButtons';
import { GroupInput } from '../../_components/group-input';

import useUserStore from '@/store/useUserInfo';

type FormInputs = {
  groupName: string;
  groupDescription: string;
  groupImage?: File | null;
};

export const CreateGroup = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });
  const setCurrentGroupId = useUserStore((state) => state.setCurrentGroupId);
  const [inviteCode, setInviteCode] = useState(null);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('name', groupNameValue);
      if (preview) {
        formData.append('groupImageUrl', preview.file);
      }
      formData.append('groupDescription', groupDescriptionValue);

      const response = await fetch(`/api/api/v1/groups`, {
        method: 'post',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('그룹 생성에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: async (response) => {
      alert('그룹이 생성되었습니다!');
      setCurrentGroupId(Number(response.data.id));
      setInviteCode(response.data.inviteCode);
      onNextButtonClick();
    },
    onError: (error) => {
      console.log(error);
      alert('그룹 생성에 실패했습니다. 다시 시도해주세요.');
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
      groupName: '',
      groupDescription: '',
    },
  });

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

  const { selectedIndex, scrollSnaps } = useDotButton(emblaApi);

  const { onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <main>
      {selectedIndex === 0 && (
        <div>
          <PrevButton
            onClick={() => router.replace('/profile')}
            className="w-[34px] h-[34px] text-[34px]"
          >
            <FaArrowLeft className="w-[34px] h-[34px]" />
          </PrevButton>
        </div>
      )}
      <div className="embla__dots mb-[25px]">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : '',
            )}
          />
        ))}
      </div>
      <section ref={emblaRef} className="overflow-hidden h-full">
        <FormProvider {...form}>
          <form className="flex h-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="min-w-full p-4 flex flex-col items-center" key={0}>
              <h2 className="text-[28px] font-bold text-center mb-[27px]">
                그룹을 <br></br> 만들어 봐요
              </h2>
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
                placeholder="그룹 이름을 입력해주세요"
                errorMessage="그룹 이름을 입력해주세요."
              />
              <GroupInput
                name="groupDescription"
                label="그룹 설명"
                control={control}
                placeholder="예) 가족 앨범, 자녀 앨범"
                errorMessage="그룹에 대한 설명을 입력해주세요."
              />
              {mutation.isPending ? (
                <Button type="button" disabled className="cursor-not-allowed">
                  그룹 생성 중...
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
                  그룹 만들기
                </Button>
              )}
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
              <p className="text-[64px] text-[#4848F9]">{inviteCode}</p>
              <div className="fixed bottom-[6%]">
                <Button
                  asChild
                  className="mb-[33px] bg-[#FEE500] text-black hover:bg-[#FEE500]/80"
                >
                  <Link href={'/'}>공유하기</Link>
                </Button>
                <Button type="button" onClick={() => router.replace('/home')}>
                  시작하기
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
        {/* 
          TODO: 초대코드 복사 기능
          */}
      </section>
    </main>
  );
};
