import { QuestionItem } from './question-item';

type QuestionType = {
  id: number;
  content: string;
  questioner: string;
  image?: string;
};
export const QuestionList = () => {
  const questions: QuestionType[] = [
    {
      id: 1,
      questioner: '김덕철',
      content: '탕수육 먹고 싶따..',
    },
    {
      id: 2,
      questioner: '김도철',
      content: '엄마 모해 나 지금 물구나무 서고 있는뎅 같이 할려?',
    },
    {
      id: 3,
      questioner: '로베르트 디쉬 아르슈 민아',
      content: '다음에도 여기 수영장 가자~~~',
    },
  ];

  if (questions.length == 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-[22px] text-slate-300">
          질문이 없어요. <br />
          추억을 기억해봐요!
        </p>
      </div>
    );
  }
  return (
    <div className="px-[30px] sm:m-auto">
      {questions?.map((question, index) => (
        <QuestionItem key={index} question={question} />
      ))}
    </div>
  );
};
