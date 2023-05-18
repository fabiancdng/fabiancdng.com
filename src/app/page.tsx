import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://fabiancdng.com'),
  title: 'Homepage | fabiancdng.com',
  description:
    "I'm Fabian Reinders, a student and full-stack web developer. On this website, I introduce myself, my projects, and my skills and write blog posts.",

  twitter: {
    card: 'summary',
    images: ['/img/logo-circle-upscaled.png'],
  },
};

export default function Home() {
  return <div></div>;
}
