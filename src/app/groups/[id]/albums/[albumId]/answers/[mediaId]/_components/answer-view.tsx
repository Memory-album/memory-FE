'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useViewStore } from '@/store/useViewStore';
import { useMessageStore } from '@/store/useMessageStore';

import { getQuestionsByMedia } from '@/features/media/api/getQuestionsByMedia';
import { VoiceAnswer } from '@/components/messages/voice-answer';
import { Upload } from './upload';

import { User as UserType } from '@/model/user';

interface Props {
  albumId: string;
  groupId: string;
  mediaId: string;
  user: UserType;
}

interface QuestionProps {
  category: string;
  content: string;
  mediaId: string;
  id: string;
  isPrivate: boolean;
  imgUrl: string;
  level: number;
  theme: string;
  uploader: {
    id: string;
    name: string;
    profileImgUrl: string;
  };
}

interface ResponseDataProps {
  questions: QuestionProps[];
}

export const AnswerView = ({ albumId, groupId, mediaId, user }: Props) => {
  const router = useRouter();
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { getMessages, deleteRoom, uploadMessage } = useMessageStore();
  const { view, setView, reset } = useViewStore();

  const queryClient = useQueryClient();

  const { data: responseData, isLoading: isQuestionLoading } = useQuery({
    queryKey: [
      'groups',
      groupId,
      'albums',
      albumId,
      'media',
      mediaId,
      'questions',
    ],
    queryFn: getQuestionsByMedia,
    enabled: !!user,
  });

  if (responseData) {
    console.log(responseData);
  }

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

  // 앨범 답변 제출 프로세스
  const handleSubmitAnswer = async () => {
    setIsAlertOpen(true);

    try {
      // 1. 질문-답변 업로드
      await uploadAlbumAnswer();

      // 2. 스토리 생성
      await generateStory();

      // 3. 관련 쿼리 모두 무효화
      // 미디어 목록 무효화
      queryClient.invalidateQueries({
        queryKey: ['groups', groupId, 'albums', albumId, 'media'],
      });

      // 질문 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: ['questions'],
      });

      // 알림 및 정리
      alert('답변이 성공적으로 저장되었습니다.');
      resetState();

      router.replace(
        `/groups/${groupId}/albums/${albumId}/photo/${responseData.mediaId}`,
      );
    } catch (error) {
      console.error('답변 저장 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요');
    } finally {
      setIsAlertOpen(false);
    }
  };

  useEffect(() => {
    deleteRoom('owner');
  }, []);

  // 1단계: 질문-답변 업로드
  const uploadAlbumAnswer = async () => {
    const questionId = responseData.questions[0].id;
    const messages = getMessages('owner');

    if (!messages.length) {
      throw new Error('답변을 먼저 입력해주세요.');
    }

    const textContent = messages[0].content;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/answers?mediaId=${mediaId}&questionId=${questionId}&textContent=${encodeURIComponent(textContent)}`,
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
  };

  // 2단계: 스토리 생성
  const generateStory = async () => {
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
  };

  // 상태 초기화
  const resetState = () => {
    reset();
    deleteRoom('owner');
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

  if (isQuestionLoading) {
    return (
      <div className="flex flex-col justify-start items-center text-slate-300">
        <p>
          <AiOutlineLoading3Quarters className="text-[30px] animate-spin" />
        </p>
      </div>
    );
  }

  // 화면에 따른 컴포넌트 렌더링
  const renderContent = () => {
    switch (view) {
      case '':
      case 'input':
        return (
          <Upload
            responseData={responseData}
            onUploadAlbum={handleSubmitAnswer}
            roomId="owner"
            isLoading={audioUploadMutation.isPending}
            open={isAlertOpen}
            onOpenChange={setIsAlertOpen}
          />
        );

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
      {renderContent()}
    </div>
  );
};
