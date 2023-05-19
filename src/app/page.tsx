import { Metadata } from 'next';

import Avatar from '../../public/img/avatar.jpg';
import HeroSection from '@/components/Homepage/HeroSection';

export const metadata: Metadata = {
  title: 'Homepage | fabiancdng.com',
};

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
