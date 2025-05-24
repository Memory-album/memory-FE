import { cookies } from 'next/headers';

// 현재 로그인된 사용자 정보 가져오기
export const getCurrentUser = async () => {
  try {
    // 쿠키에서 jwtToken 가져오기
    const token = await cookies().get('jwtToken');
    // 토큰이 없으면 null 반환
    if (!token) return null;

    const response = await fetch(`/backend/user/my-page`, {
      method: 'GET',
      next: {
        tags: ['user'],
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return null;
    }

    const { user } = await response.json();
    return user;
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return null;
  }
};
