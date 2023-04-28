import Link from 'next/link';
import {
  ISbRichtext,
  renderRichText,
  SbBlokData,
  storyblokEditable,
} from '@storyblok/react';
import ParseAdditionalCSS from '../../utils/parse-additional-css';
import { NODE_HR, render } from 'storyblok-rich-text-react-renderer';

/**
 * Data for Rich Text Section Block Type from Storyblok.
 */
interface RichTextSectionBlock extends SbBlokData {
  title: string;
  subtitle: string;
  htmlAnchor: string;
  content: ISbRichtext;
  readMoreURL: string;
  readMoreLabel: string;
  // additionalCSS: string; - Deprecated.
  additionalStyles: string;
  makeTitleH1: boolean;
}

const RichTextSection = ({ blok }: { blok: RichTextSectionBlock }) => {
  return (
    <div
      id={blok.htmlAnchor}
      style={
        blok.additionalStyles ? ParseAdditionalCSS(blok.additionalStyles) : {}
      }
      className={`rich-text-section w-full dark:bg-slate-900`}
      {...storyblokEditable(blok)}>
      {/* Wrapper */}
      <div className="container xl:max-w-7xl max-w-5xl mx-auto px-10 rounded">
        {/* Title */}
        {blok.makeTitleH1 ? (
          <h1 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-5 text-center sm:text-left mx-4 sm:mx-0">
            {blok.title}
          </h1>
        ) : (
          <h2 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-5 text-center sm:text-left mx-4 sm:mx-0">
            {blok.title}
          </h2>
        )}

        {/* Subtitle */}

        {blok.subtitle &&
          (blok.makeTitleH1 ? (
            <h2 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">
              {blok.subtitle}
            </h2>
          ) : (
            <h3 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">
              {blok.subtitle}
            </h3>
          ))}

        {/* Content */}
        <div className="text-content mx-auto mt-5 sm:w-full w-4/5">
          <div className="text-xl leading-8 text-center sm:text-left">
            {render(blok.content, {
              nodeResolvers: {
                [NODE_HR]: () => (
                  <hr className="w-full border-gray-300 dark:border-slate-600 my-10" />
                ),
              },
            })}
          </div>
        </div>

        {/* Read more link */}
        {blok.readMoreURL && (
          <div className="mt-5 flex flex-row sm:justify-start justify-center">
            <Link
              href={String(blok.readMoreURL)}
              className={`hover:bg-slate-300 bg-slate-200 rounded cursor-pointer px-10 py-3
                    text-md transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white flex items-center space-x-2`}>
              <i className="fa-regular fa-lightbulb text-lg dark:text-white" />
              <b className="font-medium">
                {blok.readMoreLabel ? blok.readMoreLabel : 'Read more'}
              </b>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextSection;
