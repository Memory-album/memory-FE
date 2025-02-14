import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { DashboardMenu } from './_components/DashboardMenu';
import { getGroupById } from '@/features/group/api/getGroupById';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['groups', id],
    queryFn: getGroupById,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="sm:m-auto w-full sm:w-[500px] px-[30px] ForGnbpaddingTop">
      <HydrationBoundary state={dehydratedState}>
        <DashboardMenu groupId={id} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
