'use client';
import { useState } from 'react';
import { useViewStore } from '@/store/useViewStore';

import { VoiceAnswer } from '@/components/messages/voice-answer';
import { Upload } from '@/components/messages/upload';
import { usePathname } from 'next/navigation';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';

const Page = () => {
  const { view } = useViewStore();
  const roomId = usePathname();
  const id = usePathname();
  const { handleFileProcessing } = useFileProcessing('');
  const images = [
    '/images/example.png',
    '/images/example2.png',
    '/images/3.png',
  ];

  // id로 질문 가져오기
  const questions = [
    '엄마 여기 기억나?\n 여기 짜장면 집 있잖아 무도 정형돈 두루미편?',
    '티비 보면서 먹고 싶다고 했는데 엄마가 바로 데려가 줬잖아ㅎㅎ\n나 그때 진짜 감동이었어ㅠ\n그때 먹었던 짜장면이제일 맛있었어',
  ];

  const [chunks, setChunks] = useState<Blob[]>([]);
  const handleSubmitAudioFile = () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    handleFileProcessing(audioBlob, 'audio');

    //  TODO: AI 음성 결과 받아서 전달
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full ForGnbpaddingTop">
      {view === '' && (
        <Upload roomId={roomId} images={images} questions={questions} />
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
