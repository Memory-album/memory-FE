import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const UserInfo = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="relative mr-[15px] size-[68px] rounded-full overflow-hidden">
          <Image src="/images/4.png" alt="유저 이미지" fill />
        </div>
        <strong className="flex-grow text-xl">이름</strong>
      </div>
      <p className="mb-4 text-xs">너 지져서 나오면 10원에 100대야.</p>
      <Button className="w-full h-7 text-xs rounded-[6px]">프로필 수정</Button>
    </div>
  );
};
