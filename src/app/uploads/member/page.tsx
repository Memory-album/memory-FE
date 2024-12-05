'use client';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '../_components/image-upload';
import { useState } from 'react';
import { Alert } from '@/components/messages/alert';
import { AiUpload } from './_components/ai-upload';
import { SelfUpload } from './_components/self-upload';
import { useViewStore } from '@/store/useViewStore';

const Page = () => {
  const { view, setView } = useViewStore();
  const [image, setImage] = useState<string>('');

  return (
    <div className="relative mb-24 w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full">
      {view === '' && (
        <>
          <ImageUpload preview={image} setPreview={setImage} />
          <div className="px-[30px] flex">
            <Button
              className="mr-[30px] py-[50px] disabled:bg-[#DAE2FF]"
              disabled={image === ''}
              onClick={() => setView('input')}
            >
              질문남기기
            </Button>
            <Alert
              nextView="ai-upload"
              description="ai가 질문을 생각하고 있어요. <br /> 조금만 기다려주세요."
              buttonValue="AI가 질문할게요"
              buttonClassName="py-[50px] disabled:bg-[#DAE2FF]"
              disabled={image === ''}
            />
          </div>
        </>
      )}
      {view === 'ai-upload' && <AiUpload imageSrc={image} />}
      {view === 'input' && <SelfUpload imageSrc={image} roomId="member" />}
    </div>
  );
};

export default Page;
