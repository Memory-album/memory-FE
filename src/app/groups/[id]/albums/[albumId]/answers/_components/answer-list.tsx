import { AnswerItem } from './answer-item';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  useInfiniteQuery,
  useQueries,
  InfiniteData,
} from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  searchText: string;
  groupId: string;
  albumId: string;
};

interface MediaProps {
  content: MediaContentProps[];
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: string;
  totalPages: string;
}

interface MediaContentProps {
  createdAt: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  id: string;
  originalFilename: string;
  story?: string;
  thumbnailUrl?: string;
  uploadedBy: UploaderProps;
}

interface UploaderProps {
  id: string;
  name: string;
  profileImgUrl: string;
}

// 질문 응답 타입
interface QuestionsResponse {
  questions: Question[];
}

interface Question {
  id: string;
  content: string;
  mediaId: string;
  theme: string;
  level: number;
  uploader: UploaderProps;
}

// 확장된 질문 타입
interface ExtendedQuestion extends Question {
  createdAt: string;
  fileUrl: string;
  searchableText: string;
}

// API 응답 타입
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export const AnswerList = ({ searchText, groupId, albumId }: Props) => {
  // 무한 스크롤 구현을 위한 ref
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 5,
  });

  // useInfiniteQuery로 변경 (타입스크립트 적용)
  const {
    data: mediaData,
    isSuccess,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<
    MediaProps,
    Error,
    InfiniteData<MediaProps>,
    [string, string, string, string, string],
    number
  >({
    queryKey: ['groups', groupId, 'albums', albumId, 'media'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/${groupId}/albums/${albumId}/media?page=${pageParam}&size=10&sort=createdAt,DESC`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const errorData = (await response.json()) as ApiResponse<unknown>;
        console.error('Error details:', errorData);
        throw new Error('Failed to fetch media data');
      }

      const responseData = (await response.json()) as ApiResponse<MediaProps>;
      return responseData.data;
    },
    getNextPageParam: (lastPage: MediaProps) => {
      // 마지막 페이지인 경우 undefined 반환 (hasNextPage가 false가 됨)
      if (lastPage.last) return undefined;
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  // 모든 미디어 콘텐츠를 하나의 배열로 평탄화
  const allMediaContents = useMemo((): MediaContentProps[] => {
    if (!mediaData) return [];
    return mediaData.pages.flatMap((page) => page.content);
  }, [mediaData]);

  // mediaPages가 있을 때만 useQueries의 queries 설정
  const mediaQuestions = useMemo(() => {
    if (!allMediaContents.length || !isSuccess) return [];

    return allMediaContents.map((media) => ({
      queryKey: ['questions', media.id] as const,
      queryFn: async (): Promise<QuestionsResponse> => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/media/${media.id}?filter=unanswered`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!response.ok)
          throw new Error(
            `미디어 ${media.id}의 질문을 불러오는데 실패했습니다.`,
          );
        const responseData =
          (await response.json()) as ApiResponse<QuestionsResponse>;
        return responseData.data;
      },
      staleTime: 5 * 60 * 1000,
    }));
  }, [allMediaContents, isSuccess]);

  const questions = useQueries({
    queries: mediaQuestions,
  });

  // 무한 스크롤 구현
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // 질문 데이터 처리 및 필터링 - 렌더링 시 직접 계산
  const processedQuestions = useMemo(() => {
    if (!allMediaContents.length || questions.length === 0) {
      return [];
    }

    return allMediaContents.flatMap((media, index) => {
      // 쿼리가 완료되지 않은 경우 건너뜀
      if (questions[index]?.isPending || !questions[index]?.data) {
        return [];
      }

      const questionArray = questions[index]?.data?.questions;

      // 질문이 없으면 빈 배열 반환
      if (!questionArray || questionArray.length === 0) {
        return [];
      }

      // ai가 작성한 질문일 때 (질문이 배열 형태로 나와서 첫번째 질문만 보여줌)
      if (questionArray.length > 1) {
        return {
          ...questionArray[0],
          createdAt: media.createdAt,
          fileUrl: media.fileUrl,
          searchableText: `${questionArray[0].uploader.name} ${questionArray[0].content}`,
        };
      }

      // 질문 배열의 각 항목에 searchableText 추가해서 반환
      return questionArray.map((item) => ({
        ...item,
        createdAt: media.createdAt,
        fileUrl: media.fileUrl,
        searchableText: `${item.uploader.name} ${item.content}`,
      }));
    });
  }, [allMediaContents, questions]);

  // 검색 필터링도 렌더링 시 직접 계산
  const filteredQuestions = useMemo(() => {
    if (!processedQuestions.length) {
      return [];
    }

    if (!searchText.trim()) {
      return processedQuestions;
    }

    const lowerSearchText = searchText.trim().toLowerCase();
    return processedQuestions.filter((question) =>
      question.searchableText.toLowerCase().includes(lowerSearchText),
    );
  }, [processedQuestions, searchText]);

  // 로딩 상태 확인
  const isSearchLoading =
    questions.some((q) => q.isPending) && processedQuestions.length === 0;

  if (isPending) {
    return (
      <div className="flex flex-col justify-start items-center text-slate-300">
        <p>
          <AiOutlineLoading3Quarters className="text-[30px] animate-spin" />
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-[22px] text-center text-slate-300">
        데이터를 불러오는 중 오류가 발생했습니다: {error.message}
      </p>
    );
  }

  if (!mediaData || !allMediaContents.length) {
    return (
      <p className="text-[22px] text-center text-slate-300">
        모든 질문에 답을 남겨주셨어요 😊
      </p>
    );
  }

  if (isSearchLoading) {
    return (
      <div className="flex flex-col justify-start items-center text-slate-300">
        <p>
          <AiOutlineLoading3Quarters className="text-[30px] animate-spin" />
        </p>
        <p>질문 로딩 중...</p>
      </div>
    );
  }

  if (filteredQuestions.length === 0 && searchText.trim()) {
    return (
      <p className="text-[22px] text-center text-slate-300">
        검색 결과가 없어요!
      </p>
    );
  }

  return (
    <div>
      {filteredQuestions.map((question) => (
        <div key={question.id}>
          <AnswerItem item={question} groupId={groupId} albumId={albumId} />
        </div>
      ))}

      {/* 무한 스크롤을 위한 관찰 대상 요소 */}
      {!searchText.trim() && hasNextPage && (
        <div ref={ref} className="h-10 flex justify-center items-center">
          {isFetchingNextPage ? (
            <AiOutlineLoading3Quarters className="text-[24px] animate-spin text-slate-300" />
          ) : (
            <p className="text-sm text-slate-300">더 불러오는 중...</p>
          )}
        </div>
      )}
    </div>
  );
};
