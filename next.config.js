/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/posts',
        permanent: true,
      },
      {
        source: '/blog/posts/1',
        destination: '/blog/posts',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
