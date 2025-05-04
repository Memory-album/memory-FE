import { redirect } from 'next/navigation';

import { MemberList } from './_components/member-list';
import { GroupInfo } from './_components/group-info';

import { getCurrentUser } from '@/features/actions';

import { User as UserType } from '@/model/user';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="px-[30px] sm:mx-auto w-full sm:w-[500px]">
      <GroupInfo id={id} />
      <MemberList id={id} />
    </div>
  );
};

export default Page;
