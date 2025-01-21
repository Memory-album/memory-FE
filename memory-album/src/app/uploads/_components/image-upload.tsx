'use client';
import { Input } from '@/components/ui/input';
import { handlePreviewFiles } from '@/lib/image/handlePreviewFiles';
import { ChangeEventHandler, useRef } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  preview: { dataUrl: string; file: File }[];
  setPreview: React.Dispatch<
    React.SetStateAction<{ dataUrl: string; file: File }[]>
  >;
};

export const ImageUpload = ({ preview, setPreview }: Props) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImage = () => {
    imageRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      if (e.target.files!!.length + preview.length > 10) {
        alert('사진은 10장 이내로 올려주세요');
        return;
      }
    }

    handlePreviewFiles(e, (result) => setPreview(result));
  };

  const handleDeleteImage = (index: number) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const getGridClasses = () => {
    if (preview.length < 5) return 'grid-cols-2 gap-4';
    return 'grid-cols-3 gap-3';
  };

  return (
    <div className="my-5">
      <Input
        type="file"
        multiple
        hidden
        ref={imageRef}
        className="hidden"
        onChange={onUpload}
      />
      {preview.length === 0 && (
        <div
          onClick={handleUploadImage}
          className="m-auto flex flex-col items-center justify-center w-[290px] h-[400px] border-[8px] border-solid border-[#dae2ff] rounded-[20px] cursor-pointer"
        >
          <MdOutlineCameraAlt className="size-[120px] text-[#dae2ff]" />
          <p className="text-lg font-bold text-[#dae2ff]">사진 업로드</p>
        </div>
      )}
      {preview.length === 1 && (
        <ImageItem
          src={preview[0]?.dataUrl}
          onDeleteImage={() => handleDeleteImage(0)}
          imageClassValue="aspect-auto"
          imageContainerClassValue="w-[290px] m-auto"
        />
      )}
      <div className="mx-[30px]">
        {preview.length > 1 && (
          <div className={cn('grid justify-items-center', getGridClasses())}>
            {preview?.map(
              (v, index) =>
                v && (
                  <ImageItem
                    key={index}
                    src={v.dataUrl}
                    onDeleteImage={() => handleDeleteImage(index)}
                    imageClassValue="object-cover aspect-square"
                  />
                ),
            )}
          </div>
        )}
      </div>
      {preview.length > 0 && (
        <div className="flex justify-center mt-[90px] mb-3">
          <Button onClick={handleUploadImage}>사진 추가하기</Button>
        </div>
      )}
    </div>
  );
};

type ItemProps = {
  src: string;
  onDeleteImage: () => void;
  imageClassValue: string;
  imageContainerClassValue?: string;
};

const ImageItem = ({
  src,
  onDeleteImage,
  imageClassValue,
  imageContainerClassValue,
}: ItemProps) => {
  return (
    <div className={cn(imageContainerClassValue, 'relative')}>
      <div
        onClick={onDeleteImage}
        className="absolute top-[-5px] right-[-4px] flex justify-center items-center text-white bg-slate-300 size-6 rounded-full cursor-pointer hover:bg-slate-500 sm:size-8 sm:text-[24px]"
      >
        x
      </div>
      <img
        src={src}
        alt="미리보기"
        className={cn(
          imageClassValue,
          'size-full rounded-[10px] overflow-hidden',
        )}
      />
    </div>
  );
};
