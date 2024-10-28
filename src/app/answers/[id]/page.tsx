'use client';
import { useState } from 'react';
import { AnswerUpload } from './_components/answer-upload';
import { VoiceAnswer } from './_components/voice-answer';

const Page = () => {
  const [currentView, setCurrentView] = useState('input');

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full pl-[30px] pr-4">
      {currentView === 'input' && <AnswerUpload currentView={setCurrentView} />}
      {currentView === 'recording' && (
        <VoiceAnswer currentView={setCurrentView} />
      )}
    </div>
  );
};

export default Page;
