'use client';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '../_components/image-upload';
import { useState } from 'react';
import { Alert } from '@/components/messages/alert';
import { AiUpload } from './_components/ai-upload';
import { SelfUpload } from './_components/self-upload';
import { useViewStore } from '@/store/useViewStore';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';

const Page = () => {
  const { view, setView } = useViewStore();
  const [image, setImage] = useState<{ dataUrl: string; file: File }[]>([]);

  const { handleFileProcessing } = useFileProcessing('ai-upload');
  const images = [
    '/images/example.png',
    '/images/example2.png',
    '/images/3.png',
  ];

  const handleSubmitImageFile = () => {
    const files = image.map((item) => item.file);

    handleFileProcessing(files, 'image');
  };

  return (
    <div className="relative mb-24 w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full ForGnbpaddingTop">
      {view === '' && (
        <>
          <ImageUpload preview={image} setPreview={setImage} />
          <div className="px-[30px] flex">
            <Button
              className="mr-[30px] py-[50px] disabled:bg-[#DAE2FF]"
              disabled={image.length === 0}
              onClick={() => setView('input')}
            >
              질문남기기
            </Button>
            <Alert
              description="ai가 질문을 생각하고 있어요. <br /> 조금만 기다려주세요."
              buttonValue="AI가 질문할게요"
              buttonClassName="py-[50px] disabled:bg-[#DAE2FF]"
              disabled={image.length === 0}
              onClick={handleSubmitImageFile}
            />
          </div>
        </>
      )}
      {view === 'ai-upload' && <AiUpload images={images} />}
      {view === 'input' && <SelfUpload images={images} roomId="member" />}
    </div>
  );
};

export default Page;
