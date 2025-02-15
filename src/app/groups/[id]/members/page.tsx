import { MemberList } from './_components/member-list';
import { GroupInfo } from './_components/group-info';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <div className="px-[30px] m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <GroupInfo id={id} />
      <MemberList id={id} />
    </div>
  );
};

export default Page;
