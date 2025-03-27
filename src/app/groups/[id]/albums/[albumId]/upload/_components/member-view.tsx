'use client';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '../_components/image-upload';
import { useState } from 'react';
import { Alert } from '@/components/messages/alert';
import { AiUpload } from './ai-upload';
import { SelfUpload } from './self-upload';
import { useViewStore } from '@/store/useViewStore';
import { useFileProcessing } from '@/lib/upload/useFileProcessing';
import { useMutation } from '@tanstack/react-query';
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

export const MemberView = ({ albumId }: Props) => {
  const [previewImages, setPreviewImages] = useState<
    { dataUrl: string; file: File }[]
  >([]);
  const [aiResponse, setAiResponse] = useState<responseData>();
  const { view, setView } = useViewStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const userId = 1;

  const aiUploadMutation = useMutation({
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
      setAiResponse(response.data);

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

  const handleSubmitImageFile = () => {
    setIsAlertOpen(true);
    const files = previewImages.map((item) => item.file);
    // TODO: 추가 구현 다중 이미지로
    const singleFile = files[0];

    aiUploadMutation.mutate(singleFile);
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
              isLoading={aiUploadMutation.isPending}
              open={isAlertOpen}
              onOpenChange={setIsAlertOpen}
            />
          </div>
        </>
      )}
      {view === 'ai-upload' && <AiUpload data={aiResponse!} />}
      {view === 'input' && <SelfUpload images="" roomId="member" />}
    </div>
  );
};
