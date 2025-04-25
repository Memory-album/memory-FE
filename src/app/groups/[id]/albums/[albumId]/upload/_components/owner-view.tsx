'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

import { ImageUpload } from './image-upload';
import { VoiceAnswer } from '@/components/messages/voice-answer';
import { Alert } from '@/components/messages/alert';
import { Upload } from '@/components/messages/upload';

import { useViewStore } from '@/store/useViewStore';
import { useMessageStore } from '@/store/useMessageStore';

import { getUser } from '@/features/auth/api/getUser';
interface Props {
  albumId: string;
  groupId: string;
}

interface ResponseDataProps {
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

export const OwnerView = ({ albumId, groupId }: Props) => {
  const router = useRouter();
  const [previewImages, setPreviewImages] = useState<
    { dataUrl: string; file: File }[]
  >([]);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [responseData, setResponseData] = useState<ResponseDataProps | null>(
    null,
  );
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { getMessages, deleteRoom, uploadMessage } = useMessageStore();
  const { view, setView, reset } = useViewStore();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  // 이미지 분석 API 뮤테이션
  const imageUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      if (!user?.id) {
        throw new Error('로그인이 필요합니다.');
      }

      const userId = user.id;

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
      setResponseData(response.data);
      setView('input');
    },
    onError: (error: Error) => {
      console.error('이미지 분석 오류:', error);
      alert(`오류가 발생했습니다: ${error.message}`);
    },
    onSettled: () => {
      setIsAlertOpen(false);
    },
  });

  // 음성 인식 API 뮤테이션
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
        throw new Error('음성을 인식할 수 없습니다.');
      }
      uploadMessage('owner', { id: uuidv4(), content: data.text });
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

  // 1. 질문-답변 업로드 뮤테이션
  const answerMutation = useMutation({
    mutationFn: async () => {
      if (!responseData) return null;

      const mediaId = responseData.mediaId;
      const questionId = responseData.questions[0].id;
      const messages = getMessages('owner');

      if (!messages.length) {
        throw new Error('답변을 먼저 입력해주세요.');
      }

      const textContent = messages[0].content;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/answers?mediaId=${mediaId}&questionId=${questionId}&textContent=${textContent}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
  });

  // 2. 스토리 생성 뮤테이션
  const storyMutation = useMutation({
    mutationFn: async () => {
      if (!responseData) return null;

      const mediaId = responseData.mediaId;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/stories/generate?mediaId=${mediaId}`,
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
  });

  // 앨범 완료 프로세스
  const handleCompleteAlbum = async () => {
    if (!responseData) return;

    setIsAlertOpen(true);

    try {
      // 1. 질문-답변 업로드
      await answerMutation.mutateAsync();

      // 2. 스토리 생성
      await storyMutation.mutateAsync();

      // 3. 성공 처리
      alert('스토리 생성 성공');
      resetState();
      router.replace(
        `/groups/${groupId}/albums/${albumId}/media/${responseData.mediaId}`,
      );
    } catch (error) {
      console.error('앨범 생성 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요');
    } finally {
      setIsAlertOpen(false);
    }
  };

  // 상태 초기화
  const resetState = () => {
    reset();
    setPreviewImages([]);
    deleteRoom('owner');
  };

  // 이미지 파일 제출 처리
  const handleSubmitImageFile = () => {
    if (previewImages.length === 0) {
      alert('이미지를 먼저 선택해주세요.');
      return;
    }

    setIsAlertOpen(true);
    const singleFile = previewImages[0].file;
    imageUploadMutation.mutate(singleFile);
  };

  // 음성 파일 제출 처리
  const handleSubmitAudioFile = () => {
    if (chunks.length === 0) {
      alert('녹음된 음성이 없습니다.');
      return;
    }

    setIsAlertOpen(true);
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    audioUploadMutation.mutate(audioBlob);
  };

  // 화면에 따른 컴포넌트 렌더링
  const renderContent = () => {
    switch (view) {
      case '':
        return (
          <>
            <ImageUpload
              preview={previewImages}
              setPreview={setPreviewImages}
            />
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
        );

      case 'input':
        return responseData ? (
          <Upload
            responseData={responseData}
            onUploadAlbum={handleCompleteAlbum}
            roomId="owner"
            isLoading={
              imageUploadMutation.isPending || audioUploadMutation.isPending
            }
            open={isAlertOpen}
            onOpenChange={setIsAlertOpen}
          />
        ) : null;

      case 'recording':
        return (
          <VoiceAnswer
            message="질문에 답장을 남겨보세요!"
            chunks={chunks}
            setChunks={setChunks}
            onSubmitAudioFile={handleSubmitAudioFile}
            isLoading={audioUploadMutation.isPending}
            open={isAlertOpen}
            onOpenChange={setIsAlertOpen}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto ForGnbpaddingTop">
      {isUserLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <p>로딩 중...</p>
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};
