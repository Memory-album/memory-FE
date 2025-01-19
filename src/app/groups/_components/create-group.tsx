'use client';

import { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import LoginHeader from '@/components/LoginHeader';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import Theme from '@/app/signup/group/create/_components/Theme';

import '@/app/signup/verifyInputStyle.css';

import '@/components/embla/embla.css';
import {
  DotButton,
  useDotButton,
} from '@/components/embla/EmblaCarouselDotButton';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/embla/EmblaCarouselButtons';
import { FormProvider, useForm } from 'react-hook-form';
import { GroupNameField } from './groupname-field';
import { useRouter } from 'next/navigation';

type FormInputs = {
  groupname: string;
  theme: string;
  groupImage?: File | null;
};

export const CreateGroup = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
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
        setPreview(reader.result as string);
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

  const onSubmit = async (values: FormInputs) => {
    console.log(values);
    const formData = new FormData();
    formData.append('name', values.groupname);
    if (preview) {
      formData.append('groupImageUrl', preview);
    }
    formData.append('groupDescription', 'senior-care');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups`,
        {
          method: 'post',
          credentials: 'include',
          body: formData,
        },
      );

      if (response.status === 200) {
        router.replace('/home');
      }
    } catch (error) {
      console.error(error);
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
          {/* 그룹 이미지, 이름 설정 */}
          <FormProvider {...form}>
            <form
              className="flex h-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div
                className="min-w-full p-4 flex flex-col items-center"
                key={0}
              >
                <h2 className="text-[28px] font-bold text-center mb-[27px]">
                  그룹을 <br></br> 만들어 봐요
                </h2>
                <div
                  onClick={handleClick}
                  className="cursor-pointer w-[177px] h-[177px] rounded-full border-4 border-[#4848F9] flex items-center justicy-center mb-[44px] overflow-hidden"
                >
                  {preview && (
                    <img
                      src={preview}
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
                <div className="fixed bottom-[6%]">
                  <NextButton
                    type="button"
                    onClick={onNextButtonClick}
                    disabled={
                      nextBtnDisabled ||
                      preview === null ||
                      groupnameValue === '' ||
                      groupnameValue === undefined
                    }
                  >
                    계속하기
                  </NextButton>
                </div>
              </div>

              {/* 앨범 테마 선택 */}
              <div
                className="min-w-full p-4 flex flex-col items-center"
                key={1}
              >
                <h2 className="text-[28px] font-bold text-center mb-[21px]">
                  앨범 테마를 <br></br> 선택해주세요
                </h2>
                <p className="text-[16px] font-semibold text-[#858585] text-center">
                  앨범의 테마에 따라<br></br>AI의 질문 추천? 이 달라져요?
                </p>
                <Theme></Theme>
                <div className="fixed bottom-[6%]">
                  <NextButton
                    type="button"
                    onClick={onNextButtonClick}
                    disabled={nextBtnDisabled || preview === null}
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
                  <Button type="submit">시작하기</Button>
                </div>
              </div>
            </form>
          </FormProvider>

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
