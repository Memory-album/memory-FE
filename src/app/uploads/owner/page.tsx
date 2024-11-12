'use client';

import { VoiceAnswer } from '@/components/messages/voice-answer';
import { useState } from 'react';
import { ImageUpload } from '../_components/image-upload';
import { Alert } from '@/components/messages/alert';
import { Upload } from '@/components/messages/upload';

type Message = {
  id: number;
  content: string;
};

const Page = () => {
  const [currentView, setCurrentView] = useState('image-upload');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNextView = (view: string) => {
    setTimeout(() => {
      setCurrentView(view);
    }, 5000);
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full">
      {currentView === 'image-upload' && (
        <div className="flex flex-col justify-center items-center">
          <ImageUpload />
          <Alert
            onNextView={() => handleNextView('input')}
            description="ai가 질문을 생각하고 있어요.<br />조금만 기다려주세요."
            buttonValue="다음"
          />
        </div>
      )}
      {currentView === 'input' && (
        <Upload
          messages={messages}
          setMessages={setMessages}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'recording' && (
        <VoiceAnswer
          onNextView={() => handleNextView('input')}
          message="질문에 답장을 남겨보세요!"
        />
      )}
    </div>
  );
};

export default Page;
