import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 URL 설정

// 그룹 참여하기
export const joinGroup = async (userData: {
  inviteCode: string;
  groupNickname: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/groups/join`,
      userData,
      {
        withCredentials: true, // 쿠키 사용 설정
      },
    );
    return response.data; // 성공 시 반환되는 데이터를 리턴
  } catch (error: any) {
    console.error(
      'Error during registration:',
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message; // 에러 처리
  }
};
