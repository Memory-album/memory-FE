'use client';

import { VoiceAnswer } from '@/components/messages/voice-answer';
import { useState } from 'react';
import { ImageUpload } from './image-upload';
import { Alert } from '@/components/messages/alert';
import { Upload } from '@/components/messages/upload';
import { useViewStore } from '@/store/useViewStore';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUser } from '@/features/auth/api/getUser';
import { Button } from '@/components/ui/button';

interface Props {
  albumId: string;
}

interface responseData {
  albumId: string;
  imageUrl: string;
  mediaId: string;
  questions: QuestionProps[];
  userId: string;
}

interface QuestionProps {
  question: string;
  category?: string;
  level?: number;
}

export const OwnerView = ({ albumId }: Props) => {
  const [previewImages, setPreviewImages] = useState<
    { dataUrl: string; file: File }[]
  >([]);
  const [response, setResponse] = useState<responseData>();
  const { view, setView } = useViewStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // const mutation = useMutation({
  //   mutationFn: async (file: Blob) => {
  //     const formData = new FormData();
  //     formData.append('audioFile', file, 'recording.webm');

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/answers/speech-to-text`,
  //       {
  //         method: 'POST',
  //         credentials: 'include',
  //         body: formData,
  //       },
  //     );

  //     if (!response.ok) {
  //       const errorData = await response
  //         .json()
  //         .catch(() => ({ message: '알 수 없는 오류가 발생했습니다.' }));
  //       throw new Error(errorData.message || '서버 오류 발생');
  //     }

  //     return response.json();
  //   },
  //   onSuccess: (data) => {
  //     console.log('음성 인식 성공:', data);
  //     // 여기서 다음 단계로 진행 (예: 상태 업데이트, 다음 화면으로 이동 등)
  //   },
  //   onError: (error: Error) => {
  //     console.error('음성 인식 오류:', error);
  //     // 사용자에게 오류 메시지 표시 (예: toast 알림)
  //     alert(`음성 인식 중 오류가 발생했습니다: ${error.message}`);
  //   },
  //   onSettled: () => {
  //     // 성공 또는 실패 후 항상 실행되는 로직
  //     // 예: 로딩 상태 해제
  //   },
  // });

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  // TODO: userId 조회
  const userId = 1;

  const imageUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      console.log('FILE', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/images/analyze?userId=${userId}&albumId=${albumId}`,
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
    onSuccess: (response) => {
      console.log('이미지 분석 성공', response);
      setResponse(response.data);

      setView('input');
    },
    onError: (error: Error) => {
      console.error('이미지 분석 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요');
    },
    onSettled: () => {
      setIsAlertOpen(false);
    },
  });

  const { handleFileProcessing } = useFileProcessing('input');

  const handleSubmitImageFile = () => {
    setIsAlertOpen(true);
    const files = previewImages.map((item) => item.file);
    // TODO: 추가 구현 다중 이미지로
    const singleFile = files[0];

    imageUploadMutation.mutate(singleFile);
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

    //mutation.mutate(audioBlob);
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto ForGnbpaddingTop">
      {view === '' && (
        <>
          <ImageUpload preview={previewImages} setPreview={setPreviewImages} />
          <div className="flex justify-center">
            <Alert
              description="ai가 질문을 생각하고 있어요"
              buttonValue="다음"
              buttonClassName="disabled:bg-[#DAE2FF]"
              disabled={previewImages.length === 0}
              onClick={handleSubmitImageFile}
              isLoading={imageUploadMutation.isPending}
              open={isAlertOpen}
              onOpenChange={setIsAlertOpen}
            />
          </div>
        </>
      )}
      {response && view === 'input' && (
        <Upload data={response!} roomId="owner" />
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
