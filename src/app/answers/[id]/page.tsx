'use client';
import { useState } from 'react';
import { VoiceAnswer } from '@/components/messages/voice-answer';
import { AnswerUpload } from './_components/answer-upload';
import { Result } from './_components/result';

type Message = {
  id: number;
  content: string;
};

const Page = () => {
  const [currentView, setCurrentView] = useState('input');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: '모르겠는데' },
    { id: 2, content: '반찬 보내게 주소나 불러' },
  ]);

  const handleNextView = () => {
    setTimeout(() => {
      setCurrentView('result');
    }, 5000);
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full">
      {currentView === 'input' && (
        <AnswerUpload
          messages={messages}
          setMessages={setMessages}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'recording' && (
        <VoiceAnswer
          onNextView={handleNextView}
          message="질문에 답장을 남겨보세요!"
        />
      )}
      {currentView === 'result' && (
        <Result messages={messages} setMessages={setMessages} />
      )}
    </div>
  );
};

export default Page;
