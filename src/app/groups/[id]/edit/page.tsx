import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { EditGroup } from './_components/edit-group';
import { getSingleGroup } from '@/features/group/api/getSingleGroup';

type Props = {
  params: { id: string };
};
const Page = async ({ params }: Props) => {
  const { id } = params;

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ['groups', id],
  //   queryFn: getSingleGroup,
  // });
  // const dehydratedState = dehydrate(queryClient);

  return (
    // <HydrationBoundary state={dehydratedState}>
    <EditGroup id={id} />
    // </HydrationBoundary>
  );
};

export default Page;
