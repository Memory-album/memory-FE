'use client';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ImageUpload } from '../_components/image-upload';
import { Alert } from '@/components/messages/alert';
import { AiUpload } from './ai-upload';
import { SelfUpload } from './self-upload';

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

export const MemberView = ({ albumId, groupId }: Props) => {
  const [previewImages, setPreviewImages] = useState<
    { dataUrl: string; file: File }[]
  >([]);
  const [responseData, setResponseData] = useState<ResponseDataProps | null>(
    null,
  );
  const { view, setView, reset } = useViewStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { getMessages, deleteRoom } = useMessageStore();
  const router = useRouter();

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
      setView('ai-upload');
    },
    onError: (error: Error) => {
      console.error('이미지 분석 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요');
    },
    onSettled: () => {
      setIsAlertOpen(false);
    },
  });

  const uploadAlbumQuestionMutation = useMutation({
    mutationFn: async ({ file, content }: { file: File; content: string }) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/with-media?groupId=${groupId}&albumId=${albumId}&content=${content}`,
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
      alert('질문 업로드 성공');
      console.log(response);
      router.replace('/home');
      resetState();
    },
    onError: (error: Error) => {
      console.error('질문 생성 오류:', error);
      alert(`오류가 발생했습니다: ${error.message}`);
    },
  });

  const handleSelfQuestionSubmit = () => {
    const file = previewImages[0].file;
    const messages = getMessages('member');

    if (!messages.length) {
      throw new Error('답변을 먼저 입력해주세요.');
    }
    const content = messages[0].content;
    uploadAlbumQuestionMutation.mutate({ file, content });
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

  // 상태 초기화
  const resetState = () => {
    reset();
    setPreviewImages([]);
    deleteRoom('member');
  };

  return (
    <div className="relative mb-24 w-full sm:w-[500px] bg-[#FAFCFF] sm:m-auto h-full ForGnbpaddingTop">
      {view === '' && (
        <>
          <ImageUpload preview={previewImages} setPreview={setPreviewImages} />
          <div className="px-[30px] flex">
            <Button
              className="mr-[30px] py-[50px] disabled:bg-[#DAE2FF]"
              disabled={previewImages.length === 0}
              onClick={() => setView('input')}
            >
              질문남기기
            </Button>
            <Alert
              description="ai가 질문을 생각하고 있어요"
              buttonValue="AI에게 맡기기"
              buttonClassName="py-[50px] disabled:bg-[#DAE2FF]"
              disabled={previewImages.length === 0}
              onClick={handleSubmitImageFile}
              isLoading={imageUploadMutation.isPending}
              open={isAlertOpen}
              onOpenChange={setIsAlertOpen}
            />
          </div>
        </>
      )}
      {view === 'ai-upload' && <AiUpload responseData={responseData!} />}
      {view === 'input' && (
        <SelfUpload
          images={previewImages[0]}
          roomId="member"
          onUpload={handleSelfQuestionSubmit}
        />
      )}
    </div>
  );
};
