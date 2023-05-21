import { Metadata } from 'next';
import Avatar from '../../public/img/avatar.jpg';
import HeroSection from '@/components/Homepage/HeroSection';
import { openGraphBaseMetadata, twitterBaseMetadata } from './metadata';
import Projects from '@/components/Homepage/Projects/Projects';
import { getAllProjects } from '@/adapters/ContentAdapter';
import SingleProject from '@/components/Homepage/Projects/Project';
import Markdown from '@/components/Markdown/Markdown';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

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
  const projects = await getAllProjects();

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

      {/* Client Component: Uses IntersectionObserver to sync scroll position with activeNavLink state in GlobalsContext. */}
      <Projects title="Projects" subtitle="Some of the work I'm involved in.">
        {/* Projects */}
        {projects.map((project, index) => (
          // Client Component: Uses client-side state.
          <SingleProject key={index} project={project} reverseDesign={index % 2 === 0}>
            {/* Server Component: Renders markdown on server and is injected as child of Server Component. */}
            <ReactMarkdown
              children={project.content}
              components={{
                p: ({ node, ...props }) => <p className="text-gray-700 dark:text-gray-400 text-lg my-4" {...props} />,
              }}
            />
          </SingleProject>
        ))}
      </Projects>
    </main>
  );
};

export default HomePage;
