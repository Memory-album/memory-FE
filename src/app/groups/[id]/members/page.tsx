'use client';
import { MemberList } from './_components/member-list';
import { GroupInfo } from './_components/group-info';

const Page = () => {
  return (
    <div className="px-[30px] m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <GroupInfo />
      <MemberList />
    </div>
  );
};

export default Page;
