import { ProfileHeader } from './_components/profile-header';
import { ProfileNav } from './_components/profile-nav';

const Page = () => {
  return (
    <div className="m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <ProfileHeader />
      <ProfileNav />
    </div>
  );
};

export default Page;
