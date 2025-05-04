import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/actions';
import { EditProfile } from './_components/edit-profile';

import { User as UserType } from '@/model/user';

const Page = async () => {
  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="px-[30px] sm:mx-auto w-full sm:w-[500px]">
      <EditProfile user={user} />
    </div>
  );
};

export default Page;
