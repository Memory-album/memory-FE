'use client';

import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="sm:m-auto w-full sm:w-[500px] px-[30px] ForGnbpaddingTop">
      // TODO: 그룹 수정
    </div>
  );
};

export default Page;
