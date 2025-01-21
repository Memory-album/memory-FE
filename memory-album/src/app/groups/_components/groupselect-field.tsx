import { useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

const themeDesc = [
  {
    title: 'senior-care',
    description:
      '가족과 함께하는 소중한 순간들을 기록하고 공유하세요. 어르신들의 일상과 특별한 순간들을 담아내는 공간입니다',
  },
  {
    title: 'child-growth',
    description:
      '아이의 성장과정을 기록하고 가족들과 공유하세요. 첫 걸음마부터 특별한 순간까지, 모든 소중한 기억을 담을 수 있습니다.',
  },
  {
    title: 'couple-story',
    description:
      '연인과의 특별한 순간들을 기록하고 공유하세요. 데이트, 기념일 등 둘만의 소중한 이야기를 담는 공간입니다.',
  },
];

type FormInputs = {
  groupname: string;
  theme: string;
  groupImage?: FileList;
};

export const GroupSelectField = () => {
  const { control } = useFormContext<FormInputs>();

  return (
    <div className="mb-[80px]">
      <FormField
        control={control}
        name="theme"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-[9px] text-[22px] font-semibold">
              앨범 테마
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="앨범 테마 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="senior-care" className="hover:bg-gray-100">
                    시니어 케어
                  </SelectItem>
                  <SelectItem
                    value="child-growth"
                    className="hover:bg-gray-100"
                  >
                    자녀 성장
                  </SelectItem>
                  <SelectItem
                    value="couple-story"
                    className="hover:bg-gray-100"
                  >
                    커플 스토리
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <p className="mt-2 text-sm text-gray-400">
              {
                themeDesc.find((theme) => theme.title === field.value)
                  ?.description
              }
            </p>
          </FormItem>
        )}
      />
    </div>
  );
};
