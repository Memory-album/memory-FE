'use client';
import { useRouter } from 'next/navigation';
import { ProfileHeader } from './_components/profile-header';
import { ProfileNav } from './_components/profile-nav';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/features/auth/api/getUser';

const Page = () => {
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (user.role !== 'OWNER') {
    window.alert('접근 권한이 없는 사용자입니다.');
    router.replace('/');
  }

  return (
    <div className="m-auto w-full sm:w-[500px] h-screen ForGnbpaddingTop">
      <ProfileHeader user={user} />
      <ProfileNav />
    </div>
  );
};

export default Page;
