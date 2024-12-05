import { AnswerItem } from './answer-item';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useFilteredList } from '@/lib/search/useFilteredList';

interface List {
  id: number;
  sender: string;
  questions: string[];
  date: Date;
  img: string;
  searchableText?: string;
}

type Props = {
  searchText: string;
};

const initialList: List[] = [
  {
    id: 1,
    sender: '오빠',
    questions: ['거기 재밌냐~~~~'],
    date: new Date(2024, 10, 29),
    img: '',
  },
  {
    id: 2,
    sender: '딸',
    questions: [
      '엄마~~ 여기 짜장면 집 기억나? 나 진짜 먹구 시퍼d 우어어어엉 나 진짜루ㅠㅠ 엄만 별로였어?',
    ],
    date: new Date(2024, 10, 22),
    img: '',
  },
  {
    id: 3,
    sender: '딸',
    questions: ['ㅋㅋㅋㅋ이것봐 짱웃겨 오빠 표정 진짜 별루야'],
    date: new Date(2024, 10, 4),
    img: '',
  },
  {
    id: 4,
    sender: '남편',
    questions: ['여보 나 용돈 좀만 더 주라.. 이거 피규어 팔 떨어졌어ㅠ'],
    date: new Date(2024, 9, 12),
    img: '',
  },
];

const processedData: List[] = initialList.map((item) => ({
  ...item,
  searchableText: `${item.sender} ${item.questions.join(' ')}`, // 검색 가능한 텍스트 생성
}));

export const AnswerList = ({ searchText }: Props) => {
  if (initialList.length === 0) {
    return (
      <p className="text-[22px] text-center text-slate-300">
        모든 질문에 답을 남겨주셨어요 😊
      </p>
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

  if (filteredList.length === 0) {
    return <p className="text-center text-slate-300">검색 결과가 없어요!</p>;
  }

  return (
    <>
      {filteredList.map((item, index) => (
        <AnswerItem key={index} item={item} />
      ))}
    </>
  );
};
