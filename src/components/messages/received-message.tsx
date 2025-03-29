import { cn } from '@/lib/utils';
import React from 'react';

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

export const ReceivedMessage = ({ questions }: Props) => {
  return (
    <div className="flex justify-start items-end mb-[25px] pl-[30px]">
      <div className="mr-4 w-[50px] h-[50px] shrink-0">
        <img
          className="block w-full h-full object-cover rounded-full"
          src="/images/profile.png"
          alt="프로필 이미지"
        />
      </div>

      <div className="flex flex-col items-start">
        {questions.map((value, index) => {
          let classNames = '';

          if (index === 0) {
            classNames = 'rounded-bl-none';
          } else if (index === questions.length - 1) {
            classNames = 'rounded-tl-none';
          } else {
            classNames = 'rounded-tl-[5px] rounded-bl-[5px]';
          }
          return (
            <QuestionItem
              key={index}
              id={value.id}
              question={value.question}
              classNames={classNames}
            />
          );
        })}
      </div>
    </div>
  );
};

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
