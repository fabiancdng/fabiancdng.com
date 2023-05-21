'use client';

import { Project } from '@/types';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

const ProjectThumbnail = ({ project }: { project: Project }) => {
  return (
    <div className="md:w-2/4">
      {project.thumbnail && (
        <a href={project.metadata.demo ? project.metadata.demo : '#'} target="_blank">
          <Image
            src={project.thumbnail.source}
            width={project.thumbnail.dimensions.width}
            height={project.thumbnail.dimensions.height}
            alt={project.metadata.title}
            className="rounded-md"
          />
        </a>
      )}
    </div>
  );
};

interface SingleProjectProps {
  project: Project;
  reverseDesign: boolean;
  children: ReactNode;
}

const SingleProject = ({ project, reverseDesign, children }: SingleProjectProps) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [reverseDesignState, setReverseDesign] = useState(reverseDesign);

  useEffect(() => {
    const handleResize = () => {
      // Set the screen width.
      setScreenWidth(window.innerWidth);

      // Disregard reverse design if viewport is too small.
      if (screenWidth < 768) setReverseDesign(false);
      else setReverseDesign(reverseDesign);
    };

    // Event listener for keeping screenWidth up-to-date.
    window.addEventListener('resize', handleResize);

    // Initial call on mount.
    handleResize();

    // Cleanup resource-hungry event listeners after unmount.
    return () => window.removeEventListener('resize', handleResize);
  }, [screenWidth, reverseDesign]);

  return (
    <div className="container pb-5 max-w-6xl mx-auto mt-24 text-black dark:text-white">
      <div className="flex flex-col md:flex-row mt-14 mb-14">
        {/* Thumbnail (if not reversed) */}
        {!reverseDesignState && <ProjectThumbnail project={project} />}

        {/* Project info */}
        <div className={`md:w-2/3 md:mt-0 mt-6 ${!reverseDesignState ? 'md:pl-16' : 'md:pr-16'}`}>
          {/* Technologies used */}
          {project.metadata.technologies && (
            <div className="flex flex-row space-x-3">
              {project.metadata.technologies.map((technology, index) => (
                <div key={index} className="mb-1 inline-flex space-x-3">
                  <p className="text-blue-800 font-semibold text-lg dark:text-slate-400">{technology.toUpperCase()}</p>
                  {/* Seperate technologies with '/' */}
                  {index !== project.metadata.technologies.length - 1 && (
                    <p className="text-gray-800 font-semibold dark:text-slate-200">/</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl font-semibold my-2">{project.metadata.title}</h2>

          {/* Subtitle */}
          <h3 className="text-2xl font-medium">{project.metadata.subtitle}</h3>

          {/* Description/Content */}
          {children}

          <div className="flex flex-row align-center space-x-4 mt-5">
            {/* View code link with GitHub icon */}
            {project.metadata.github && project.metadata.github !== '' && (
              <a
                href={`https://github.com/${project.metadata.github}`}
                target="_blank"
                className="flex items-center align-baseline w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2">
                <i className="fa-brands fa-github mr-2 text-xl" />
                <p className="mr-1">View Code</p>
              </a>
            )}

            {/* View demo link with icon*/}
            {project.metadata.demo && (
              <a
                href={project.metadata.demo}
                target="_blank"
                className="flex items-center align-baseline w-fit dark:hover:bg-slate-600 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2">
                <i className="fa-solid fa-arrow-up-right-from-square mr-2 text-xl" />
                <p className="mr-1">View Demo</p>
              </a>
            )}
          </div>
        </div>

        {/* Thumbnail (if reversed) */}
        {reverseDesignState && <ProjectThumbnail project={project} />}
      </div>
    </div>
  );
};

export default SingleProject;
