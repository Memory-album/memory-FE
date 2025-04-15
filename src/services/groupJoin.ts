import axios from 'axios';
import { useRouter } from 'next/navigation';

export const joinGroup = async (userData: {
  inviteCode: string;
  groupNickname: string;
}) => {
  const router = useRouter();

  try {
    // 그룹 참여 요청
    const joinResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/join`,
      userData,
      {
        withCredentials: true, // 쿠키 사용 설정
      },
    );

    console.log('Join Group Response:', joinResponse.data);

    // 성공적으로 그룹에 참여했으면 홈 데이터 요청
    const homeResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/home`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (homeResponse.status === 200) {
      console.log('Home response:', homeResponse.data);
      router.push('/home');
    }
  } catch (error: any) {
    console.error(
      'Error during registration or home request:',
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message; // 에러 처리
  }
};
