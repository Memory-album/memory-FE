'use client';

import { VoiceAnswer } from '@/components/messages/voice-answer';
import { useState } from 'react';
import { ImageUpload } from './image-upload';
import { Alert } from '@/components/messages/alert';
import { Upload } from '@/components/messages/upload';
import { useViewStore } from '@/store/useViewStore';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';
import { useMutation } from '@tanstack/react-query';

export const OwnerView = () => {
  const { view } = useViewStore();
  const [image, setImage] = useState<{ dataUrl: string; file: File }[]>([]);

  const mutation = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append('audioFile', file, 'recording.webm');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/answers/speech-to-text`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: '알 수 없는 오류가 발생했습니다.' }));
        throw new Error(errorData.message || '서버 오류 발생');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('음성 인식 성공:', data);
      // 여기서 다음 단계로 진행 (예: 상태 업데이트, 다음 화면으로 이동 등)
    },
    onError: (error: Error) => {
      console.error('음성 인식 오류:', error);
      // 사용자에게 오류 메시지 표시 (예: toast 알림)
      alert(`음성 인식 중 오류가 발생했습니다: ${error.message}`);
    },
    onSettled: () => {
      // 성공 또는 실패 후 항상 실행되는 로직
      // 예: 로딩 상태 해제
    },
  });

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
    if (chunks.length === 0) {
      alert('녹음된 음성이 없습니다.');
      return;
    }

    const audioBlob = new Blob(chunks, { type: 'audio/webm' });

    // 로딩 상태 설정 (별도의 상태 관리가 필요합니다)
    // setIsLoading(true);

    mutation.mutate(audioBlob);
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
