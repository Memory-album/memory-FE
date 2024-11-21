'use client';
import { Input } from '@/components/ui/input';
import { ChangeEventHandler, useRef, useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';

type Props = {
  preview: string | null;
  setPreview: (preview: string) => void;
};
export const ImageUpload = ({ preview, setPreview }: Props) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleUploadImage = () => {
    imageRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const file = (e.target.files as FileList)[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <Input
        type="file"
        hidden
        ref={imageRef}
        className="hidden"
        onChange={onUpload}
        aria-hidden={true}
      />
      <div
        onClick={handleUploadImage}
        className="mx-[50px] mb-[90px] h-[450px] flex rounded-[20px] overflow-hidden"
      >
        {!preview && (
          <div className="flex flex-col items-center justify-center w-[290px] h-full border-[8px] border-solid border-[#dae2ff] rounded-[20px] ">
            <MdOutlineCameraAlt className="size-[120px] text-[#dae2ff]" />
            <p className="text-lg font-bold text-[#dae2ff]">사진 업로드</p>
          </div>
        )}
        {preview && (
          <div className="w-[290px] my-auto rounded-[20px] overflow-hidden">
            <img
              src={preview}
              alt="미리보기"
              className="size-full aspect-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};
