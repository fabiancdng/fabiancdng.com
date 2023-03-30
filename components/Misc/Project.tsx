import { SbBlokData } from '@storyblok/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsGithub, BsLink45Deg } from 'react-icons/bs';
import { ImageAsset } from '../../types';

/**
 * Data for Project Block Type from Storyblok.
 */
interface ProjectBlock extends SbBlokData {
  title: string;
  subtitle: string;
  thumbnail?: ImageAsset;
  description: string;
  technologies: string[];
  gitLink: string;
  demoLink: string;
  reverseDesign: boolean;
}

const ProjectThumbnail = ({ blok }: { blok: ProjectBlock }) => {
  return (
    <div className="md:w-2/4">
      {blok.thumbnail && (
        <a
          href={blok.demoLink && blok.demoLink !== '' ? blok.demoLink : '#'}
          target="_blank">
          <Image
            src={blok.thumbnail?.filename}
            width={600}
            height={400}
            alt={blok.thumbnail?.alt}
            className="rounded-md"
          />
        </a>
      )}
    </div>
  );
};

const Project = ({ blok }: { blok: ProjectBlock }) => {
  const descriptionParagraphs = blok.description
    ? blok.description.split('\n')
    : [''];

  const [screenWidth, setScreenWidth] = useState(0);
  const [reverseDesign, setReverseDesign] = useState(blok.reverseDesign);

  useEffect(() => {
    const handleResize = () => {
      // Set the screen width.
      setScreenWidth(window.innerWidth);

      // Disregard reverse design if viewport is too small.
      if (screenWidth < 768) setReverseDesign(false);
      else setReverseDesign(blok.reverseDesign);
    };

    // Event listener for keeping screenWidth up-to-date.
    window.addEventListener('resize', handleResize);
  }, [screenWidth]);

  return (
    <div className="container pb-5 xl:max-w-7xl max-w-5xl mx-auto px-10 text-black dark:text-white">
      <div className="flex flex-col md:flex-row mt-14 mb-24">
        {/* Thumbnail (if not reversed) */}
        {!reverseDesign && <ProjectThumbnail blok={blok} />}

        {/* Project info */}
        <div
          className={`md:w-2/3 md:mt-0 mt-5 ${
            !reverseDesign ? 'md:pl-14' : 'md:pr-14'
          }`}>
          {/* Technologies used */}
          {blok.technologies && (
            <div className="flex flex-row space-x-3">
              {blok.technologies.map((technology, index) => (
                <div key={index} className="mb-1">
                  <a className="text-blue-800 font-semibold text-lg dark:text-slate-400">
                    {technology.toUpperCase()}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl font-semibold my-2">{blok.title}</h2>

          {/* Subtitle */}
          <h3 className="text-2xl font-medium">{blok.subtitle}</h3>

          {/* Description */}

          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-600 dark:text-slate-400 my-3">
              {paragraph}
            </p>
          ))}

          <div className="flex flex-row align-center space-x-4 mt-5">
            {/* View code link with BsGitHub icon from 'react-icons' */}
            {blok.gitLink && blok.gitLink !== '' && (
              <a
                href={blok.demoLink}
                target="_blank"
                className="flex items-center align-baseline w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2">
                <BsGithub className="mr-2 text-xl" />
                <p className="mr-1">View Code</p>
              </a>
            )}

            {/* View demo link with BsLink45Deg icon from 'react-icons' */}
            {blok.demoLink && blok.demoLink !== '' && (
              <a
                href={blok.demoLink}
                target="_blank"
                className="flex items-center align-baseline w-fit dark:hover:bg-slate-600 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2">
                <BsLink45Deg className="mr-2 text-xl" />
                <p className="mr-1">View Demo</p>
              </a>
            )}
          </div>
        </div>

        {/* Thumbnail (if reversed) */}
        {reverseDesign && <ProjectThumbnail blok={blok} />}
      </div>
    </div>
  );
};

export default Project;
