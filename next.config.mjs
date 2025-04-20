/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mini-album-storage.s3.amazonaws.com', // 수정된 호스트명
      },
    ],
  },
};

export default nextConfig;
