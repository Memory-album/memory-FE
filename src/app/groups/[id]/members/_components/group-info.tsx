import Image from 'next/image';

export const GroupInfo = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="relative mr-[15px] size-[68px] rounded-full overflow-hidden">
          <Image src="/images/4.png" alt="그룹 이미지" fill />
        </div>
        <strong className="flex-grow text-xl">미니언즈 모임</strong>
      </div>
    </div>
  );
};
