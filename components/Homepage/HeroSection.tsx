import { SbBlokData, storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { ImageAsset } from '../../types';
import ParseAdditionalCSS from '../../utils/parse-additional-css';

/**
 * Data for Hero Section Block Type from Storyblok.
 */
interface HeroSectionBlock extends SbBlokData {
  title: string;
  subtitle: string;
  description: string;
  avatar?: ImageAsset;
  htmlAnchor: string;
  // additionalCSS: string; - Deprecated.
  additionalStyles: string;
}

const HeroSection = ({ blok }: { blok: HeroSectionBlock }) => {
  return (
    <div
      id={blok.htmlAnchor}
      style={
        blok.additionalStyles ? ParseAdditionalCSS(blok.additionalStyles) : {}
      }
      className={`h-screen flex flex-col justify-center align-middle dark:bg-slate-900`}
      {...storyblokEditable(blok)}>
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-10 lg:mt-25">
        {/* Text & Socials */}
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <h1
            className="text-4xl lg:text-6xl text-center
                    lg:text-left mb-4 font-bold dark:text-slate-50">
            {blok.title}
          </h1>
          <h2
            className="text-3xl lg:text-5xl text-center lg:text-left text-slate-700
                    mb-4 dark:text-slate-200">
            {blok.subtitle}
          </h2>
          <h3
            className="text-2xl lg:text-3xl text-center lg:text-left mb-7 text-gray-500
                    dark:text-slate-400">
            {blok.description}
          </h3>
        </div>

        {/* Logo */}
        {blok.avatar && (
          <div className="flex justify-center flex-1 lg:mb-0 z-10">
            <div className="lg:w-3/6 lg:h-3/6 w-6/12 h-6/12">
              <Image
                src={blok.avatar?.filename}
                alt={blok.avatar?.alt}
                width={500}
                height={500}
                sizes="(min-width: 1024px) 25vw
                        (min-width: 1280px) 35vw,
                        45vw"
                priority
                className="rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
