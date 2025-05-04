import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/actions';

import { DashboardMenu } from './_components/DashboardMenu';

import { User as UserType } from '@/model/user';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="sm:mx-auto w-full sm:w-[500px] px-[30px]">
      <DashboardMenu groupId={id} />
    </div>
  );
};

export default Page;
