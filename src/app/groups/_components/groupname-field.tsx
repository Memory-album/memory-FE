import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type FormInputs = {
  groupname: string;
  theme: string;
  groupImage?: File | null;
};

export const GroupNameField = () => {
  const { register, control } = useFormContext<FormInputs>();
  const [focus, setFocus] = useState(false);

  // groupname 입력값을 감시
  const groupnameWatched = useWatch({
    control,
    name: 'groupname',
  });

  return (
    <div className="mb-10">
      <FormField
        control={control}
        name="groupname"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-[9px] text-[22px] after:content-['*'] after:ml-0.5 after:text-pink-600 font-semibold">
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
            {!groupnameWatched && focus && (
              <FormMessage className="text-pink-600 text-sm font-semibold">
                그룹 이름은 필수값입니다.
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
