import { MemberList } from './_components/member-list';
import { GroupInfo } from './_components/group-info';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getMembersByGroupId } from '@/features/member/api/getMembersByGroupId';

const Page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  const id = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['groups', id, 'members'],
    queryFn: getMembersByGroupId,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="px-[30px] m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <HydrationBoundary state={dehydratedState}>
        <GroupInfo />
        <MemberList id={id} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
