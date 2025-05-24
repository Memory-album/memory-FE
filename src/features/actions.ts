import { cookies } from 'next/headers';

// 현재 로그인된 사용자 정보 가져오기
export const getCurrentUser = async () => {
  try {
    // 쿠키에서 jwtToken 가져오기
    const token = await cookies().get('jwtToken');
    console.log('JWT Token from cookies:', token); // 토큰 존재 여부 확인

    if (!token) return null;

    console.log('Making API request to /backend/user/my-page'); // API 요청 시작 로그
    const response = await fetch(`/backend/user/my-page`, {
      next: {
        tags: ['user'],
      },
      headers: {
        Cookie: `jwtToken=${token.value}`, // 쿠키 명시적 전달
      },
      credentials: 'include',
    });

    console.log('API Response status:', response.status); // 응답 상태 코드 확인
    console.log(
      'API Response headers:',
      Object.fromEntries(response.headers.entries()),
    ); // 응답 헤더 확인

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return null;
    }

    const data = await response.json();
    console.log('API Response data:', data); // 응답 데이터 확인
    const { user } = data;
    return user;
  } catch (error) {
    console.error('getCurrentUser error:', error); // 에러 상세 정보
    return null;
  }
};
