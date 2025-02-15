import { EditGroup } from './_components/edit-group';

type Props = {
  params: { id: string };
};
const Page = async ({ params }: Props) => {
  const { id } = params;

  return <EditGroup id={id} />;
};

export default Page;
