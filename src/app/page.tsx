import { Metadata } from 'next';
import Avatar from '../../public/img/avatar.jpg';
import HeroSection from '@/components/Homepage/HeroSection';
import { openGraphBaseMetadata, twitterBaseMetadata } from './metadata';
import Contact from '@/components/Homepage/Contact';
import Projects from '@/components/Homepage/Projects/Projects';
import SingleProject from '@/components/Homepage/Projects/Project';
import { Project } from '@/types';
import fs from 'fs/promises';

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
  const file = await fs.readFile(process.cwd() + '/src/app/data/projects.json', 'utf8');
  const projects = JSON.parse(file);

  return (
    <main>
      <HeroSection
        title="I'm Fabian."
        subtitle="Hey!"
        description="I'm a <b><u>student</u></b> & <b><u>full-stack web developer</u></b> and I build stuff for the web."
      />

      {/* <Introduction /> */}

      {/* Client Component: Uses IntersectionObserver to sync scroll position with activeNavLink state in GlobalsContext. */}
      <Projects title="Projects" subtitle="Some of the things I've built.">
        {projects.data.map((project: Project, index: number) => (
          <SingleProject key={index} project={project} reverseDesign={index % 2 === 0} description={project.description} />
        ))}
      </Projects>

      <Contact title="Contact me" subtitle="Feel free to contact me using the email below or the contact form." />
    </main>
  );
};

export default HomePage;
