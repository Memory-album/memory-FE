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
    <div className="px-[30px] sm:mx-auto w-full sm:w-[500px]">
      <PasswordChangeForm user={user} />
    </div>
  );
};

export default Page;
