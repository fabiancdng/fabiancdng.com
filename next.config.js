/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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

      // v3 -> v4 changed the permalink structure.
      {
        source: '/authors/fabiancdng',
        destination: '/author/fabiancdng',
        permanent: true,
      },
      {
        source: '/blog/tags/WordPress',
        destination: '/blog/tag/wordpress',
        permanent: true,
      },
      {
        source: '/blog/tags/Next.js',
        destination: '/blog/tag/next-js',
        permanent: true,
      },
      {
        source: '/blog/tags/Docker',
        destination: '/blog/tag/docker',
        permanent: true,
      },
      {
        source: '/blog/tags/SEO',
        destination: '/blog/tag/seo',
        permanent: true,
      },
      {
        source: '/blog/tags/Node.js',
        destination: '/blog/tag/node-js',
        permanent: true,
      },

      // Redirects for SEO and backwards compatibility / changed slugs and stuff.
      {
        source: '/blog/how-to-programmatically-create-virtual-pages-in-wordpress',
        destination: '/blog/how-to-create-virtual-pages-in-wordpress',
        permanent: true,
      },
      {
        source: '/blog/scaling-next-js-node-js-web-apps-with-docker',
        destination: '/blog/scaling-next-js-web-apps-with-docker',
        permanent: true,
      },
      {
        source: '/blog/scaling-next-js-web-apps-with-docker',
        destination: '/blog/scaling-node-js-web-apps-with-docker',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
