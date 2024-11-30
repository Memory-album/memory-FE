'use client';

import { useParams } from 'next/navigation';
import { GroupForm } from '../../_components/group-form';

const Page = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="sm:m-auto w-full sm:w-[500px] px-[30px]">
      <GroupForm flow="edit" id={+id} />
    </div>
  );
};

export default Page;
