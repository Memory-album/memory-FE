'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
  groupname: string;
  groupImage?: FileList;
};

type Props = {
  flow: 'create' | 'edit';
};

export function GroupForm({ flow }: Props) {
  const [focus, setFocus] = useState(false);
  const form = useForm<FormData>({
    defaultValues: {
      groupname: '',
    },
  });

  // 그룹 이름 입력값 감시
  const groupnameValue = useWatch({
    control: form.control,
    name: 'groupname',
  });

  const onSubmit = (values: FormData) => {
    // const formData = new FormData();
    // formData.append('groupname', values.groupname);

    // // 이미지 파일이 있는 경우에만 FormData에 추가
    // if (values.groupImage && values.groupImage.length > 0) {
    //   formData.append('groupImage', values.groupImage[0]);
    // }

    // console.log('FormData:', Array.from(formData.entries()));
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[60px]">
        <div className="mb-10">
          <FormField
            control={form.control}
            name="groupImage"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className="mb-[9px] text-[22px] font-bold">
                  그룹 대표 사진
                </FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-[60px] h-[106px]">
          <FormField
            control={form.control}
            name="groupname"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className="mb-[9px] text-[22px] after:content-['*'] after:ml-0.5 after:text-[#4848f9] font-semibold">
                  그룹 이름
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    onFocus={() => setFocus(true)}
                    className="w-full border-b-[1px] border-b-[#5F5F5F] leading-9 placeholder:text-[#C2C2C2] focus:outline-none main-bg"
                    placeholder="그룹 이름을 입력해주세요"
                  />
                </FormControl>
                {!groupnameValue && focus && (
                  <FormMessage className="text-[#4848f9] text-sm font-semibold">
                    그룹 이름은 필수값입니다.
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!groupnameValue}
            className={`${
              groupnameValue ? 'text-white' : 'bg-gray-300 text-gray-600'
            }`}
          >
            {flow === 'create' ? '그룹 만들기' : '확인'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
