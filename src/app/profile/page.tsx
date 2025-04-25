import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/actions';

import { UserGroups } from './_components/user-groups';
import { UserInfo } from './_components/user-info';

import { User as UserType } from '@/model/user';

const Page = async () => {
  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="px-[30px] m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <UserInfo user={user} />
      <UserGroups />
    </div>
  );
};

export default Page;
