'use client';

import { ReactNode, useContext, useEffect, useRef } from 'react';
import { GlobalsContext } from '../../../context/Globals';

interface ProjectsProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * Wrapper for a single <Project /> component.
 */
const Projects = ({ title, subtitle, children }: ProjectsProps) => {
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
    <div id="projects" ref={projectsSectionRef}>
      <div className="container max-w-7xl mx-auto px-10 rounded">
        {/* Title */}
        {title && (
          <h2 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-5 text-center sm:text-left mx-4 sm:mx-0">{title}</h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <h3 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">{subtitle}</h3>
        )}

        {/* Projects; Rendered as Server Component */}
        {children}
      </div>
    </div>
  );
};

export default Projects;
