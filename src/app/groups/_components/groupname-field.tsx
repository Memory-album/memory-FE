import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Control, FieldArray, useWatch } from 'react-hook-form';

export const GroupNameField = ({
  control,
}: {
  control: Control<FieldArray | any>;
}) => {
  const [focus, setFocus] = useState(false);

  // groupname 입력값을 감시
  const groupnameWatched = useWatch({
    control,
    name: 'groupname',
    defaultValue: '',
  });

  return (
    <div>
      <FormField
        control={control}
        name="groupname"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input
                onFocus={() => setFocus(true)}
                className="w-full border-b-[1px] border-b-[#5F5F5F] leading-9 placeholder:text-[#C2C2C2] focus:outline-none main-bg"
                placeholder="그룹 이름을 입력해주세요"
                {...control.register('groupname')}
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
