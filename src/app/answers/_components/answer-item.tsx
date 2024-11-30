'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(isToday);

type Props = {
  item: {
    id: number;
    sender: string;
    questions: string[];
    date: Date;
    img: string;
  };
};

export const AnswerItem = ({ item }: Props) => {
  const router = useRouter();
  let date;

  if (dayjs(item.date).isToday()) {
    date = dayjs(item.date).fromNow();
  } else {
    date = dayjs(item.date).format('YYYY.MM.DD');
  }
  return (
    <div
      className="px-[15px] py-3 h-[80px] flex items-center cursor-pointer"
      onClick={() => router.push('/answers/1')}
    >
      <div className="mr-3.5 w-[50px] h-[50px] rounded-[15px] bg-slate-400">
        <Image
          className="block rounded-[15px] object-cover"
          src="/images/profile.png"
          width={50}
          height={50}
          alt="프로필 이미지"
        />
      </div>
      <div className="grow flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <strong className="font-semibold">{item.sender}</strong>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
        <p className="inline-block max-w-[250px] max-h-[32px] text-sm leading-[14px] text-gray-500 text-overflow">
          {item.questions[0]}
        </p>
      </div>
    </div>
  );
};
