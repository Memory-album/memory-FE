'use client';
import { getGroupById } from '@/features/group/api/getGroupById';
import { useQuery } from '@tanstack/react-query';
import { OwnerView } from './_components/owner-view';
import { MemberView } from './_components/member-view';

type Props = {
  params: { id: string; albumId: string };
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const albumId = params.albumId;

  const { data: group, isLoading } = useQuery({
    queryKey: ['groups', id],
    queryFn: getGroupById,
  });

  const isOwner = group?.role === 'OWNER';
  return (
    <div>
      {isOwner ? (
        <OwnerView albumId={albumId} />
      ) : (
        <MemberView albumId={albumId} />
      )}
    </div>
  );
};

export default Page;
