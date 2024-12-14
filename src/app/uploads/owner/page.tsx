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
  const [image, setImage] = useState<{ dataUrl: string; file: File }[]>([]);
  const { handleFileProcessing } = useFileProcessing('input');
  const images = [
    '/images/example.png',
    '/images/example2.png',
    '/images/3.png',
  ];

  const handleSubmitImageFile = () => {
    const files = image.map((item) => item.file);
    handleFileProcessing(files, 'image');

    // TODO: AI 질문 결과 받아서 전달
  };

  const [chunks, setChunks] = useState<Blob[]>([]);
  const handleSubmitAudioFile = () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    handleFileProcessing(audioBlob, 'audio');

    // TODO: AI 음성 결과 받아서 전달
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto ForGnbpaddingTop">
      {view === '' && (
        <>
          <ImageUpload preview={image} setPreview={setImage} />
          <div className="flex justify-center">
            <Alert
              description="ai가 질문을 생각하고 있어요.<br />조금만 기다려주세요."
              buttonValue="다음"
              buttonClassName="disabled:bg-[#DAE2FF]"
              disabled={image.length === 0}
              onClick={handleSubmitImageFile}
            />
          </div>
        </>
      )}
      {view === 'input' && (
        <Upload images={images} roomId="owner" questions={['질문 데이터']} />
      )}
      {view === 'recording' && (
        <VoiceAnswer
          message="질문에 답장을 남겨보세요!"
          chunks={chunks}
          setChunks={setChunks}
          onSubmitAudioFile={handleSubmitAudioFile}
        />
      )}
    </div>
  );
};

export default Page;
