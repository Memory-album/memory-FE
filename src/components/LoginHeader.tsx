'use client';
import { usePathname, useRouter } from 'next/navigation';

// import { IoArrowBackOutline } from 'react-icons/io5';

const LoginHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  let headerPathName;

  if (pathname === '/login') {
    headerPathName = '로그인';
  } else if (pathname === '/signup') {
    headerPathName = '회원가입';
  } else if (pathname === '/invite') {
    headerPathName = '그룹 코드';
  }

  return (
    <div className="fixed top-0 w-full h-[102px]">
      {/* <div className="ml-[27px] mt-[54px] items-center flex">
        <button onClick={() => router.back()}>
          <IoArrowBackOutline size={34} color="#6E6E6E" />
        </button>
        <p
          className="w-[80px] text-semibold text-[20px] absolute text-center"
          style={{ left: `calc(50% - 40px)` }}
        >
          {headerPathName}
        </p>
      </div> */}
      <div className="mt-[60px] items-center flex">
        <p className="mx-auto w-[80px] text-semibold text-[20px] text-center">
          {headerPathName}
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
