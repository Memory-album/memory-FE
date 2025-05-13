import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  questions: QuestionProps[];
};

type QuestionProps = {
  id: string;
  question: string;
  category?: string;
  level?: number;
  classNames?: string;
};

// export const ReceivedMessage = ({ questions }: Props) => {
//   const combinedQuestions = questions
//     .map((q, index) => `${index + 1}. ${q.question}`)
//     .join('\n\n');

//   return (
//     <div className="flex justify-start items-end mb-[25px] pl-[30px]">
//       <div className="mr-4 w-[50px] h-[50px] shrink-0">
//         <img
//           className="block w-full h-full object-cover rounded-full"
//           src="/images/profile.png"
//           alt="프로필 이미지"
//         />
//       </div>

//       <div className="flex flex-col items-start">
//         {/* {questions.map((value, index) => {
//           let classNames = '';

//           if (index === 0) {
//             classNames = 'rounded-bl-none';
//           } else if (index === questions.length - 1) {
//             classNames = 'rounded-tl-none';
//           } else {
//             classNames = 'rounded-tl-[5px] rounded-bl-[5px]';
//           }
//           return (
//             <QuestionItem
//               key={index}
//               id={value.id}
//               question={value.question}
//               classNames={classNames}
//             />
//           );
//         })} */}
//       </div>
//     </div>
//   );
// };

const QuestionItem = ({
  id,
  question,
  category,
  level,
  classNames,
}: QuestionProps) => {
  return (
    <p
      className={cn(
        'py-3 px-[17px] mb-1 max-w-[240px] bg-[#ABA5FF] rounded-[20px] text-white text-base',
        classNames,
      )}
    >
      {question.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export const ReceivedMessage = ({ questions }: Props) => {
  // 첫 번째 질문을 메인 질문으로 사용하고, 나머지는 추가 질문으로 표시
  const mainQuestion = questions[0]?.question || '질문이 없습니다.';
  const hasAdditionalQuestions = questions.length > 1;

  return (
    <div className="flex justify-start items-end mb-[25px] pl-[30px]">
      <div className="mr-4 w-[50px] h-[50px] shrink-0">
        <img
          className="block w-full h-full object-cover rounded-full"
          src="/images/profile.png"
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
                    {q.question}
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
