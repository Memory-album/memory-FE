import React from 'react';

type Props = {
  questions: QuestionProps[];
};

interface QuestionProps {
  category: string;
  content: string;
  mediaId: string;
  id: string;
  isPrivate: boolean;
  level: number;
  theme: string;
  uploader: {
    id: string;
    name: string;
    profileImgUrl: string;
  };
  classNames?: string;
}

export const ReceivedMessage = ({ questions }: Props) => {
  // 첫 번째 질문을 메인 질문으로 사용하고, 나머지는 추가 질문으로 표시
  const mainQuestion = questions[0]?.content || '질문이 없습니다.';
  const hasAdditionalQuestions = questions.length > 1;

  return (
    <div className="flex justify-start items-end mb-[25px] pl-[30px]">
      <div className="mr-4 w-[50px] h-[50px] shrink-0">
        <img
          className="block w-full h-full object-cover rounded-full"
          src={questions[0].uploader.profileImgUrl}
          alt="기본 이미지"
        />
      </div>

      <div className="flex flex-col items-start">
        <div className="py-3 px-[17px] mb-1 max-w-[240px] bg-[#ABA5FF] rounded-[20px] text-white text-base">
          <p className="font-medium">{mainQuestion}</p>

          {hasAdditionalQuestions && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">(추가 질문)</p>
              <ul className="pl-5 list-disc space-y-2">
                {questions.slice(1).map((q) => (
                  <li key={q.id} className="text-sm">
                    {q.content}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
