import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/actions';
import { PasswordChangeForm } from './_components/password-change-form';

import { User as UserType } from '@/model/user';

const Page = async () => {
  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="px-[30px] m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <PasswordChangeForm user={user} />
    </div>
  );
};

export default Page;
