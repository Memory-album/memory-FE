import { PiPencilDuotone } from 'react-icons/pi';
import { MemberList } from './_components/member-list';
import { Item } from '@/app/groups/_components/item';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <Link href="/groups/1/edit" className="fixed top-[102px] right-0">
        <PiPencilDuotone className="text-[28px] text-[#85B6FF] ml-auto" />
      </Link>
      <div className="mb-[35px] flex flex-col items-center">
        <Item classNames="size-[135px] sm:size-[160px]" name="미니언즈 모임" />
      </div>
      <div className="px-[70px] pb-[90px]">
        <MemberList />
      </div>
    </div>
  );
};

export default Page;
