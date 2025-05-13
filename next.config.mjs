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
};

export default nextConfig;
