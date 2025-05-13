import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/actions';

import { User as UserType } from '@/model/user';
import { AlbumList } from './_components/album-list';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const id = params.id;

  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="w-full h-full sm:w-[500px] bg-[#FAFCFF] sm:mx-auto">
      <AlbumList groupId={id} />
    </div>
  );
};

export default Page;
