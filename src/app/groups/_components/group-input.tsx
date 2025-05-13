import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Control, FieldArray, useWatch } from 'react-hook-form';

interface GroupInputProps {
  name: string;
  label: string;
  control: Control<FieldArray | any>;
  defaultValue?: string;
  errorMessage?: string;
  placeholder?: string;
}
export const GroupInput = ({
  name,
  label,
  control,
  errorMessage,
  placeholder,
  defaultValue,
}: GroupInputProps) => {
  const [focus, setFocus] = useState(false);

  const groupInputWatched = useWatch({
    control,
    name,
    defaultValue: defaultValue || '',
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="h-[120px]">
          <FormLabel className="text-[22px] font-bold">{label}</FormLabel>
          <FormControl>
            <input
              onFocus={() => setFocus(true)}
              className="w-full border-b-[1px] border-b-[#5F5F5F] leading-9 placeholder:text-[#C2C2C2] focus:outline-none main-bg"
              placeholder={placeholder}
              defaultValue={defaultValue}
              {...control.register(name)}
            />
          </FormControl>
          {!groupInputWatched && focus && (
            <FormMessage className="text-pink-600 text-sm font-semibold">
              {errorMessage}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
