import { cookies } from 'next/headers';
// 현재 로그인된 사용자 정보 가져오기
export const getCurrentUser = async () => {
  try {
    // 쿠키에서 jwtToken 가져오기
    const token = await cookies().get('jwtToken');
    // 토큰이 없으면 null 반환
    if (!token) return null;

    const response = await fetch('http://54.180.249.142/user/my-page', {
      headers: {
        Cookie: `jwtToken=${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return null;
    }

    const { user } = await response.json();
    return user;
  } catch {
    return null;
  }
};
