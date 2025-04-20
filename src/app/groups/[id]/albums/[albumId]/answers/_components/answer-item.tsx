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

interface UploaderProps {
  id: string;
  name: string;
  profileImgUrl: string;
}

interface Question {
  id: string;
  content: string;
  mediaId: string;
  theme: string;
  level: number;
  uploader: UploaderProps;
  createdAt: string;
  searchableText: string;
  fileUrl: string;
}

type Props = {
  item: Question;
  groupId: string;
  albumId: string;
};

export const AnswerItem = ({ item, groupId, albumId }: Props) => {
  const router = useRouter();
  let formatDate;

  if (dayjs(item.createdAt).isToday()) {
    formatDate = dayjs(item.createdAt).fromNow();
  } else {
    formatDate = dayjs(item.createdAt).format('YYYY.MM.DD');
  }
  return (
    <div
      className="px-[15px] py-3 h-[80px] flex items-center cursor-pointer hover:bg-slate-100"
      onClick={() =>
        router.push(
          `/groups/${groupId}/albums/${albumId}/answers/${item.mediaId}`,
        )
      }
    >
      <div className="mr-3.5 w-[50px] h-[50px] rounded-[15px] bg-slate-400 overflow-hidden">
        <Image
          className="block rounded-[15px] object-cover"
          src={item.fileUrl}
          width={50}
          height={50}
          alt="질문 이미지"
        />
      </div>
      <div className="grow flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <strong className="font-semibold">{item.uploader.name}</strong>
          <p className="text-sm text-gray-400">{formatDate}</p>
        </div>
        <p className="inline-block max-w-[250px] max-h-[32px] text-sm leading-[14px] text-gray-500 text-overflow">
          {item.content}
        </p>
      </div>
    </div>
  );
};
