import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Controller,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import { usePreviewFile } from '@/lib/image/usePreviewFile';
import { ChangeEventHandler, useRef } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';

type FormInputs = {
  groupname: string;
  theme: string;
  groupImage?: File | null;
};

export const GroupImageField = () => {
  const { control } = useFormContext<FormInputs>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { preview, handlePreviewFile } = usePreviewFile();

  const handleInputRef = () => {
    imageRef.current?.click();
  };

  const onUpload = (file: File) => {
    if (file.size > 1024 * 1024) {
      alert(
        Math.round(file.size / 1024 / 1024) +
          'MB(1MB까지만 업로드 가능합니다.)',
      );
      return;
    }

    handlePreviewFile(file);
  };

  return (
    <div className="mb-10">
      <FormItem>
        <FormLabel className="mb-[9px] text-[22px] font-bold">
          그룹 대표 사진
        </FormLabel>
        <FormControl>
          <Controller
            control={control}
            name="groupImage"
            render={({ field: { onChange, value } }) => (
              <Input
                type="file"
                accept="image/*"
                hidden
                ref={imageRef}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    onChange(file);
                    onUpload(file);
                  }
                }}
              />
            )}
          />
        </FormControl>
      </FormItem>
      <div
        onClick={handleInputRef}
        className="mt-2 size-24 rounded-[10px] overflow-hidden"
      >
        {!preview && (
          <div className="flex justify-center items-center size-full border-[4px] border-solid border-[#dae2ff] rounded-[10px] ">
            <MdOutlineCameraAlt className="size-[50px] text-[#dae2ff]" />
          </div>
        )}
        {preview && (
          <div className="size-24 rounded-[10px] overflow-hidden">
            <img
              src={preview.dataUrl}
              alt="미리보기"
              className="block size-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};
