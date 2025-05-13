import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { QuestionItem } from './question-item';
import { useFilteredList } from '@/lib/search/useFilteredList';

interface List {
  id: number;
  receiver: string;
  questionSummary: string;
  img: string;
  searchableText?: string;
}

type Props = {
  searchText: string;
};

const initialList: List[] = [
  {
    id: 1,
    receiver: '오빠',
    questionSummary: '거기 재밌냐~~~~',
    img: '',
  },
  {
    id: 2,
    receiver: '딸',
    questionSummary:
      '엄마~~ 여기 짜장면 집 기억나? 나 진짜 먹구 시퍼d 우어어어엉 나 진짜루ㅠㅠ 엄만 별로였어?',
    img: '',
  },
  {
    id: 3,
    receiver: '딸',
    questionSummary: 'ㅋㅋㅋㅋ이것봐 짱웃겨 오빠 표정 진짜 별루야',
    img: '',
  },
  {
    id: 4,
    receiver: '남편',
    questionSummary: '여보 나 용돈 좀만 더 주라.. 이거 피규어 팔 떨어졌어ㅠ',
    img: '',
  },
];

const processedData: List[] = initialList.map((item) => ({
  ...item,
  searchableText: `${item.receiver} ${item.questionSummary}`, // 검색 가능한 텍스트 생성
}));

export const QuestionList = ({ searchText }: Props) => {
  if (initialList.length == 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-[22px] text-center text-slate-300">
          질문이 없어요. <br />
          추억을 기억해봐요!
        </p>
      </div>
    );
  }

  const { filteredList, loading } = useFilteredList(
    initialList,
    processedData,
    searchText,
  );

  if (loading) {
    console.log(loading);
    return (
      <div className="flex flex-col justify-start items-center text-slate-300">
        <p>
          <AiOutlineLoading3Quarters className="text-[30px] animate-spin" />
        </p>
      </div>
    );
  }

  if (filteredList.length == 0) {
    return <p className="text-center text-slate-300">검색 결과가 없어요!</p>;
  }
  return (
    <div className="px-[30px] sm:m-auto">
      {filteredList?.map((question, index) => (
        <QuestionItem key={index} question={question} />
      ))}
    </div>
  );
};
