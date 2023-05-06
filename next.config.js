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
      // Important for functionality and backwards compatibility.
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

      // Redirects for SEO and backwards compatibility / changed slugs and stuff.
      {
        source:
          '/blog/how-to-programmatically-create-virtual-pages-in-wordpress',
        destination: '/blog/how-to-create-virtual-pages-in-wordpress',
        permanent: true,
      },
      {
        source: '/blog/scaling-next-js-node-js-web-apps-with-docker',
        destination: '/blog/scaling-next-js-web-apps-with-docker',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
