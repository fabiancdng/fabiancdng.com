import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from '@storyblok/react';
import ParseAdditionalCSS from '../../../utils/parse-additional-css';

/**
 * Data for Skills Block Type from Storyblok.
 */
interface SkillsBlock extends SbBlokData {
  title: string;
  subtitle: string;
  htmlAnchor: string;
  skills: SbBlokData[];
  // additionalCSS: string; - Deprecated.
  additionalStyles: string;
}

const Skills = ({ blok }: { blok: SkillsBlock }) => {
  return (
    <div
      id={blok.htmlAnchor}
      style={
        blok.additionalStyles ? ParseAdditionalCSS(blok.additionalStyles) : {}
      }
      className="container xl:max-w-7xl max-w-5xl mx-auto px-10 py-10 w-full dark:bg-slate-800 bg-slate-100 rounded"
      {...storyblokEditable(blok)}>
      {/* Title */}
      <h1 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-5 text-center sm:text-left mx-4 sm:mx-0">
        {blok.title}
      </h1>

      {/* Subtitle */}
      {blok.subtitle && (
        <h2 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">
          {blok.subtitle}
        </h2>
      )}

      {/* Skills */}
      <div className="mx-auto mt-5 sm:w-full w-4/5">
        <div className="flex sm:justify-start justify-center flex-wrap">
          {blok.skills.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
