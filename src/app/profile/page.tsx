import { UserGroups } from './_components/user-groups';
import { UserInfo } from './_components/user-info';

const Page = () => {
  return (
    <div className="px-[30px] m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <UserInfo />
      <UserGroups />
    </div>
  );
};

export default Page;
