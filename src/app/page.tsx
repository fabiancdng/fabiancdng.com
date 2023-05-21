import { Metadata } from 'next';
import Avatar from '../../public/img/avatar.jpg';
import HeroSection from '@/components/Homepage/HeroSection';
import { openGraphBaseMetadata, twitterBaseMetadata } from './metadata';

/**
 * Set some metadata for the page for SEO.
 */
export const metadata: Metadata = {
  title: 'Homepage | fabiancdng.com',
  alternates: {
    canonical: new URL(process.env.NEXT_PUBLIC_URL || 'https://fabiancdng.com'),
  },
  twitter: {
    ...twitterBaseMetadata,
    title: 'Homepage | fabiancdng.com',
  },
  openGraph: {
    ...openGraphBaseMetadata,
    title: 'Homepage | fabiancdng.com',
  },
};

const HomePage = () => {
  return (
    <main>
      <HeroSection
        title="I'm Fabian"
        subtitle="Hey!"
        description="Student & Full-Stack Web Developer"
        logo={{
          src: Avatar,
          alt: 'Fabian profile picture',
          sizes: `(min-width: 1024px) 25vw
                (min-width: 1280px) 35vw,
                45vw`,
        }}
      />
    </main>
  );
};

export default HomePage;
