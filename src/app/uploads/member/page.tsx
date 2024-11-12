'use client';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '../_components/image-upload';
import { useState } from 'react';
import { Alert } from '@/components/messages/alert';
import { AiUpload } from './_components/ai-upload';
import { SelfUpload } from './_components/self-upload';

type Message = {
  id: number;
  content: string;
};

const Page = () => {
  const [currentView, setCurrentView] = useState('image-upload');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: '할루야 할루' },
  ]);

  const handleNextView = (view: string) => {
    setTimeout(() => {
      setCurrentView(view);
    }, 5000);
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full">
      {currentView === 'image-upload' && (
        <>
          <ImageUpload />
          <div className="px-[30px] flex">
            <Button
              className="mr-[30px] py-[50px]"
              onClick={() => setCurrentView('input')}
            >
              질문남기기
            </Button>
            <Alert
              onNextView={() => handleNextView('ai-upload')}
              description="ai가 질문을 생각하고 있어요. <br /> 조금만 기다려주세요."
              buttonValue="AI가 질문할게요"
              buttonClassName="py-[50px]"
            />
          </div>
        </>
      )}
      {currentView === 'ai-upload' && <AiUpload />}
      {currentView === 'input' && (
        <SelfUpload messages={messages} setMessages={setMessages} />
      )}
    </div>
  );
};

export default Page;
