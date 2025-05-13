import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/actions';
import { EditGroup } from './_components/edit-group';

import { User as UserType } from '@/model/user';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="w-full h-full sm:w-[500px] bg-[#FAFCFF] sm:mx-auto">
      <EditGroup id={id} />
    </div>
  );
};

export default Page;
