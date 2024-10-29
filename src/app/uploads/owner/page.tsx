'use client';

import { VoiceAnswer } from '@/components/messages/voice-answer';
import { ImageUpload } from './_components/image-upload';
import { useState } from 'react';
import { AnswerUpload } from '@/components/messages/answer-upload';

const Page = () => {
  const [currentView, setCurrentView] = useState('image-upload');
  const [messages, setMessages] = useState<string[]>([]);

  const handleNextView = (view: string) => {
    setTimeout(() => {
      setCurrentView(view);
    }, 5000);
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full pl-[30px] pr-4">
      {currentView === 'image-upload' && (
        <ImageUpload onNextView={() => handleNextView('input')} />
      )}
      {(currentView === 'input' || currentView === 'result') && (
        <AnswerUpload
          messages={messages}
          setMessages={setMessages}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'recording' && (
        <VoiceAnswer
          onNextView={() => handleNextView('result')}
          message="질문에 답장을 남겨보세요!"
        />
      )}
    </div>
  );
};

export default Page;
