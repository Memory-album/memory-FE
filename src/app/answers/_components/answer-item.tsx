import Image from 'next/image';

export const AnswerItem = () => {
  return (
    <div className="px-[15px] py-3 h-[80px] flex items-center">
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
          <strong className="font-semibold">오빠</strong>
          <p className="text-sm text-gray-400">2024.01.12</p>
        </div>
        <p className="inline-block max-w-[250px] max-h-[32px] text-sm leading-[14px] text-gray-500 text-overflow">
          거기 재밌냐~~~ㅋㅋㅋㅋ
        </p>
      </div>
    </div>
  );
};
