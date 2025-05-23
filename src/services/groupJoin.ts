import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const joinGroup = async (
  userData: {
    inviteCode: string;
    groupNickname: string;
  },
  router: AppRouterInstance,
) => {
  try {
    // 그룹 참여 요청
    const joinResponse = await axios.post(
      `/backend/api/v1/groups/join`,
      userData,
      {
        withCredentials: true, // 쿠키 사용 설정
      },
    );

    console.log('Join Group Response:', joinResponse.data);

    // 성공적으로 그룹에 참여했으면 홈 데이터 요청
    const homeResponse = await axios.get(`/backend/user/home`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
