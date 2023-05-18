import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from '@storyblok/react';
import ParseAdditionalCSS from '../../../utils/parse-additional-css';
import { useContext, useEffect, useRef } from 'react';
import { GlobalsContext } from '../../../context/Globals';

/**
 * Data for Project Block Type from Storyblok.
 */
interface ProjectBlock extends SbBlokData {
  title: string;
  subtitle: string;
  projects: SbBlokData[];
  additionalStyles: string;
}

/**
 * Wrapper for a single <Project /> component.
 */
const Projects = ({ blok }: { blok: ProjectBlock }) => {
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  // Get values from global website context to set active nav item.
  const { setActiveNavItem } = useContext(GlobalsContext);

  useEffect(() => {
    // Create IntersectionObserver to change active nav item based on section in viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveNavItem('projects');
        } else {
          setActiveNavItem('home');
        }
      },
      { threshold: 0.2 }
    );

    // Observe whether #projects section is in viewport.
    observer.observe(projectsSectionRef.current!);

    return () => {
      // Disconnect observer when component unmounts.
      observer.disconnect();
    };
  }, [setActiveNavItem]);

  return (
    <div
      id="projects"
      ref={projectsSectionRef}
      {...storyblokEditable(blok)}
      style={ParseAdditionalCSS(blok.additionalStyles)}>
      <div className="container xl:max-w-7xl max-w-5xl mx-auto px-10 rounded">
        {/* Title */}
        {blok.title && (
          <h2 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-5 text-center sm:text-left mx-4 sm:mx-0">
            {blok.title}
          </h2>
        )}

        {/* Subtitle */}
        {blok.subtitle && (
          <h3 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">
            {blok.subtitle}
          </h3>
        )}
      </div>

      {/* Projects */}
      {blok.projects.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Projects;
