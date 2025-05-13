import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/actions';
import { AnswerView } from './_components/answer-view';

import { User as UserType } from '@/model/user';

type Props = {
  params: { id: string; albumId: string; mediaId: string };
};

const page = async ({ params }: Props) => {
  const { id: groupId, albumId, mediaId } = params;

  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <AnswerView
      groupId={groupId}
      albumId={albumId}
      mediaId={mediaId}
      user={user}
    />
  );
};

export default page;
