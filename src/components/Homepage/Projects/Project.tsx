'use client';

import { WP_Embedded_Term, WP_Post } from '@/types';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

const ProjectThumbnail = ({ project }: { project: WP_Post }) => {
  return (
    <div className="md:w-2/4">
      {project && (
        // <a href={project.metadata.demo ? project.metadata.demo : '#'} target="_blank">
        <Image
          src={project['_embedded']['wp:featuredmedia'][0].source_url}
          width={project['_embedded']['wp:featuredmedia'][0].media_details.width}
          height={project['_embedded']['wp:featuredmedia'][0].media_details.height}
          alt={project['_embedded']['wp:featuredmedia'][0].alt_text}
          className="rounded-md"
        />
        // </a>
      )}
    </div>
  );
};

interface SingleProjectProps {
  project: WP_Post;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div className="portfolio-project-large">
      <div className="portfolio-project-large-inner">
        {/* Thumbnail (if not reversed) */}
        <ProjectThumbnail project={project} />

        {/* Project info */}
        <div className="project-info">
          {/* Technologies used */}
          {project['_embedded']['wp:term'] && (
            <div className="flex flex-row space-x-3">
              {project['_embedded']['wp:term'][1].map(
                (term: WP_Embedded_Term, index: number) =>
                  // Only display tags, not categories.
                  term.taxonomy === 'post_tag' && (
                    <div key={index} className="mb-1 inline-flex space-x-3">
                      <p className="text-blue-800 font-semibold text-lg dark:text-slate-400">{term.name.toUpperCase()}</p>
                      {/* Seperate technologies with '/' */}
                      {index !== project['_embedded']['wp:term'].length - 1 && (
                        <p className="text-gray-800 font-semibold dark:text-slate-200">/</p>
                      )}
                    </div>
                  )
              )}
            </div>
          )}

          {/* Title */}
          <h2>{project.title.rendered}</h2>

          {/* Subtitle */}
          {/* <h3 className="text-2xl font-medium my-3">{project.metadata.subtitle}</h3> */}

          {/* Description/Content */}
          <div className="portfolio-project-description" dangerouslySetInnerHTML={{ __html: project.content.rendered }}></div>

          {/* <div className="flex flex-row align-center space-x-4 mt-5"> */}
          {/* View code link with GitHub icon */}
          {/* {project.metadata.github && project.metadata.github !== '' && (
              <a
                href={`https://github.com/${project.metadata.github}`}
                target="_blank"
                className="flex items-center align-baseline w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2">
                <i className="fa-brands fa-github mr-2 text-xl" />
                <p className="mr-1">View Code</p>
              </a>
            )} */}

          {/* View demo link with icon*/}
          {/* {project.metadata.demo && (
              <a
                href={project.metadata.demo}
                target="_blank"
                className="flex items-center align-baseline w-fit dark:hover:bg-slate-600 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2">
                <i className="fa-solid fa-arrow-up-right-from-square mr-2 text-xl" />
                <p className="mr-1">View Demo</p>
              </a>
            )} */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
