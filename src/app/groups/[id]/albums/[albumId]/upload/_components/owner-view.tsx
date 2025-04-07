'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ImageUpload } from './image-upload';
import { VoiceAnswer } from '@/components/messages/voice-answer';
import { Alert } from '@/components/messages/alert';
import { Upload } from '@/components/messages/upload';
import { useViewStore } from '@/store/useViewStore';
import { useMessageStore } from '@/store/useMessageStore';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';
import { getUser } from '@/features/auth/api/getUser';

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

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
  id: string;
  question: string;
  category?: string;
  level?: number;
}

export const OwnerView = ({ albumId }: Props) => {
  const router = useRouter();
  const [previewImages, setPreviewImages] = useState<
    { dataUrl: string; file: File }[]
  >([]);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [responseData, setResponse] = useState<responseData>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { uploadMessages, getMessages, deleteRoom } = useMessageStore();
  const { view, setView } = useViewStore();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  // TODO: userId 조회
  const userId = 1;
  console.log('USER', user);

  const imageUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

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

  const audioUploadMutation = useMutation({
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
      if (data.text === '') {
        throw new Error();
      }
      uploadMessages('owner', { id: uuidv4(), content: data.text });
      setView('input');
    },
    onError: (error: Error) => {
      console.error('음성 인식 오류:', error);
      alert(`음성 인식 중 오류가 발생했습니다: ${error.message}`);
    },
    onSettled: () => {
      setChunks([]);
      setIsAlertOpen(false);
    },
  });

  const albumUploadMutation = useMutation({
    mutationFn: async () => {
      const mediaId = responseData?.mediaId;
      const textContent = getMessages('owner')[0].content;
      console.log(textContent);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/answers?mediaId=${mediaId}&textContent=${textContent}`,
        {
          method: 'POST',
          credentials: 'include',
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
      alert('앨범 업로드 성공');
      router.replace('/home');
      setView('');
      setPreviewImages([]);
      deleteRoom('owner');
    },
    onError: (error: Error) => {
      console.error('앨범 업로드 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요');
    },
  });

  const handleSubmitImageFile = () => {
    setIsAlertOpen(true);
    const files = previewImages.map((item) => item.file);
    // TODO: 추가 구현 다중 이미지로
    const singleFile = files[0];

    imageUploadMutation.mutate(singleFile);
  };

  const handleSubmitAudioFile = () => {
    if (chunks.length === 0) {
      alert('녹음된 음성이 없습니다.');
      return;
    }
    setIsAlertOpen(true);
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    audioUploadMutation.mutate(audioBlob);
  };

  const handleSubmitAlbum = () => {
    albumUploadMutation.mutate();
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
      {responseData && view === 'input' && (
        <Upload
          responseData={responseData!}
          onUploadAlbum={handleSubmitAlbum}
          roomId="owner"
        />
      )}
      {view === 'recording' && (
        <VoiceAnswer
          message="질문에 답장을 남겨보세요!"
          chunks={chunks}
          setChunks={setChunks}
          onSubmitAudioFile={handleSubmitAudioFile}
          isLoading={audioUploadMutation.isPending}
          open={isAlertOpen}
          onOpenChange={setIsAlertOpen}
        />
      )}
    </div>
  );
};
