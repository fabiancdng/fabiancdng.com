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
        source: '/blog/posts',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/posts/1',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
