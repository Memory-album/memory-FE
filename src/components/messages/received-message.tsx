import React from 'react';

type Props = {
  questions: QuestionProps[];
};

type QuestionProps = {
  question: string;
  category?: string;
  level?: number;
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
        {questions.map((value, index) => (
          <QuestionItem key={index} question={value.question} />
        ))}
      </div>
    </div>
  );
};

const QuestionItem = ({ question, category, level }: QuestionProps) => {
  return (
    <p className="py-3 px-[17px] mb-1 max-w-[240px] bg-[#ABA5FF] rounded-[20px] rounded-bl-none text-white text-base">
      {question.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};
