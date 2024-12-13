'use client';

import { VoiceAnswer } from '@/components/messages/voice-answer';
import { useState } from 'react';
import { ImageUpload } from '../_components/image-upload';
import { Alert } from '@/components/messages/alert';
import { Upload } from '@/components/messages/upload';
import { useViewStore } from '@/store/useViewStore';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';

const Page = () => {
  const { view } = useViewStore();
  const [image, setImage] = useState<{
    dataUrl: string;
    file: File;
  } | null>(null);

  const { handleFileProcessing } = useFileProcessing('input');

  const handleSubmitImageFile = () => {
    handleFileProcessing(image!.file, 'image');
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto ForGnbpaddingTop">
      {view === '' && (
        <div className="flex flex-col justify-center items-center">
          <ImageUpload preview={image} setPreview={setImage} />
          <Alert
            description="ai가 질문을 생각하고 있어요.<br />조금만 기다려주세요."
            buttonValue="다음"
            buttonClassName="disabled:bg-[#DAE2FF]"
            disabled={image == null}
            onClick={handleSubmitImageFile}
          />
        </div>
      )}
      {view === 'input' && (
        <Upload
          imageSrc={image?.dataUrl as string}
          roomId="owner"
          questions={['질문 데이터']}
        />
      )}
      {view === 'recording' && (
        <VoiceAnswer message="질문에 답장을 남겨보세요!" nextView="input" />
      )}
    </div>
  );
};

export default Page;
