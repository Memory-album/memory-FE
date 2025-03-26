import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwtToken');

  // 보호된 페이지에 접근하려고 하는데 세션 토큰이 없으면 로그인 페이지로 이동
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/password-change',
    '/albums/:path*',
    '/groups/:path*',
    '/answers/:path*',
    '/likes/:path*',
    '/home',
    '/uploads/:path*',
  ], // ✅ 보호할 경로 패턴 지정
};
