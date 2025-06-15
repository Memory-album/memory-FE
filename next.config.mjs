/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mini-album-storage.s3.amazonaws.com', // ✅ S3 버킷 도메인 추가
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ 빌드 시 ESLint 무시
  },
};

export default nextConfig;
