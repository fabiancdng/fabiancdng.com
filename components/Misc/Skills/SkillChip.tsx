import { SbBlokData, storyblokEditable } from '@storyblok/react';
import ParseAdditionalCSS from '../../../utils/parse-additional-css';
interface SkillChipBlock extends SbBlokData {
  title: string;
  icon: string;
  // additionalCSS: string; - Deprecated.
  additionalStyles: string;
}

const SkillChip = ({ blok }: { blok: SkillChipBlock }) => {
  return (
    <div
      style={
        blok.additionalStyles ? ParseAdditionalCSS(blok.additionalStyles) : {}
      }
      className={`flex flex-row items-center w-fit cursor-pointer hover:bg-slate-300 bg-slate-200 dark:hover:bg-slate-600 dark:bg-slate-700
            rounded-full px-4 py-2 mr-3 my-3 transition-all duration-300 ease-in-out`}
      {...storyblokEditable(blok)}>
      <div className="flex flex-row items-center justify-center">
        {blok.icon && (
          <div className="mr-2 text-xl">
            <i className={blok.icon} />
          </div>
        )}
        <div className="text-gray-800 dark:text-slate-100 font-semibold">
          {blok.title}
        </div>
      </div>
    </div>
  );
};

export default SkillChip;
