import { Metadata } from 'next';

/**
 * Shared metadata to be inherited and then overwritten by the components.
 */
export const twitterBaseMetadata = {
  title: 'fabiancdng.com',
  description:
    "I'm Fabian Reinders, a student and full-stack web developer. On this website, I introduce myself, my projects, and my skills and write blog posts.",
  card: 'summary',
  site: '@fabiancdng',
  images: [
    {
      url: '/img/logo.png',
      width: 232,
      height: 232,
      alt: 'fabiancdng.com Logo',
    },
  ],

  openGraph: {},
};

export const openGraphBaseMetadata = {
  title: 'fabiancdng.com',
  description:
    "I'm Fabian Reinders, a student and full-stack web developer. On this website, I introduce myself, my projects, and my skills and write blog posts.",
  type: 'website',
  siteName: process.env.NEXT_PUBLIC_SITENAME || 'fabiancdng.com',
  images: [
    {
      url: '/img/logo.png',
      width: 232,
      height: 232,
      alt: 'fabiancdng.com Logo',
    },
  ],
};
