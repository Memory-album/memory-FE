import Image from 'next/image';

type Props = {
  question: {
    id: number;
    content: string;
    questioner: string;
    image?: string;
  };
};

export const QuestionItem = ({ question }: Props) => {
  return (
    <div className="flex mb-[46px] w-full">
      <div className="flex flex-col items-end justify-between pr-[17px] grow text-right">
        <strong className="text-sm text-[#8FB6FF] font-semibold w-20 truncate">
          {question.questioner}
        </strong>
        <p className="inline-block py-3 px-[17px] max-w-[232px] sm:max-w-[300px] text-lg bg-[#4848F9] rounded-[20px] rounded-tr-none text-white truncate">
          {question.content}
        </p>
      </div>
      <Image
        className="rounded-[5px]"
        src="/images/profile.png"
        width={80}
        height={80}
        alt="앨범 이미지"
      />
    </div>
  );
};
