import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { UserGroups } from './_components/user-groups';
import { UserInfo } from './_components/user-info';
import { getUserGroups } from '@/features/group/api/getUserGroups';

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', 'groups'],
    queryFn: getUserGroups,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="px-[30px] m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <HydrationBoundary state={dehydratedState}>
        <UserInfo />
        <UserGroups />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
