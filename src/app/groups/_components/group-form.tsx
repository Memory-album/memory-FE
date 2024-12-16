'use client';

import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { GroupNameField } from './groupname-field';
import { GroupImageField } from './groupimage-field';
import { GroupSelectField } from './groupselect-field';

type FormInputs = {
  groupname: string;
  theme: string;
  groupImage?: File | null;
};

type Props = {
  flow: 'create' | 'edit';
  id?: number;
};

export function GroupForm({ flow, id }: Props) {
  const form = useForm<FormInputs>({
    defaultValues: {
      groupname: '',
      theme: 'senior-care',
      groupImage: null,
    },
  });

  const onSubmit = (values: FormInputs) => {
    // const formData = new FormData();
    // formData.append('groupname', values.groupname);

    // // 이미지 파일이 있는 경우에만 FormData에 추가
    // if (values.groupImage && values.groupImage.length > 0) {
    //   formData.append('groupImage', values.groupImage[0]);
    // }

    // console.log('FormData:', Array.from(formData.entries()));
    console.log(values);
    // if (flow === 'create') {
    //   router.replace('/home');
    // } else {
    //   router.replace(`/groups/${id}/members`);
    // }
  };

  const groupnameWatched = useWatch({
    control: form.control,
    name: 'groupname',
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[60px]">
        <GroupImageField />
        <GroupNameField />
        {flow === 'create' && <GroupSelectField />}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!groupnameWatched}
            className={`${
              groupnameWatched ? 'text-white' : 'bg-gray-300 text-gray-600'
            }`}
          >
            {flow === 'create' ? '그룹 만들기' : '확인'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
