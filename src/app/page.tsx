import { Metadata } from 'next';
import HeroSection from '@/components/Homepage/HeroSection';
import { openGraphBaseMetadata, twitterBaseMetadata } from './metadata';
import Contact from '@/components/Homepage/Contact';
import Projects from '@/components/Homepage/Projects/Projects';
import SingleProject from '@/components/Homepage/Projects/Project';
import { getWpRessource } from '@/adapters/WordPressAdapter';
import { WP_Post } from '@/types';

import './wp-blocks.css';

/**
 * Set some metadata for the page for SEO.
 */
export const metadata: Metadata = {
  title: 'Homepage | fabiancdng.com',
  alternates: {
    canonical: '/',
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

const HomePage = async () => {
  const projects: any = await getWpRessource('portfolio_project', {
    _embed: true,
  });

  return (
    <main>
      <HeroSection
        title="I'm Fabian."
        subtitle="Hey!"
        description="I'm a <b><u>student</u></b> & <b><u>full-stack web developer</u></b> based in Germany."
      />

      {/* <Introduction /> */}

      {/* Client Component: Uses IntersectionObserver to sync scroll position with activeNavLink state in GlobalsContext. */}
      <Projects title="Projects" subtitle="Some of the things I've built.">
        {projects.map((project: WP_Post, index: number) => (
          <SingleProject key={index} project={project} />
        ))}
      </Projects>

      <Contact title="Contact me" subtitle="Feel free to contact me using the email below or the contact form." />
    </main>
  );
};

export default HomePage;
