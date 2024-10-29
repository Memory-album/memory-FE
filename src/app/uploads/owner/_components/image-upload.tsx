'use client';
import { Alert } from '@/components/messages/alert';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';

type Props = {
  onNextView: () => void;
};

export const ImageUpload = ({ onNextView }: Props) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleUploadImage = () => {
    imageRef.current?.click();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Input type="file" hidden ref={imageRef} className="hidden" />
      <div
        onClick={handleUploadImage}
        className="flex flex-col justify-center items-center m-auto mb-[90px] w-[290px] h-[450px] border-[8px] border-solid border-[#dae2ff] rounded-[20px]"
      >
        <MdOutlineCameraAlt className="size-[120px] text-[#dae2ff]" />
        <p className="text-lg font-bold text-[#dae2ff]">사진 업로드</p>
      </div>
      <Alert
        onNextView={onNextView}
        description="ai가 질문을 생각하고 있어요. <br /> 조금만 기다려주세요."
        buttonValue="다음"
      />
    </div>
  );
};
