import { SbBlokData } from '@storyblok/react';
import { ImageAsset } from '../../../types';
import Image from 'next/image';
interface SkillChipBlock extends SbBlokData {
  title: string;
  icon: string;
  additionalCSS: string;
  svgFallbackIcon: ImageAsset;
}

const SkillChip = ({ blok }: { blok: SkillChipBlock }) => {
  return (
    <div
      className={`flex flex-row items-center w-fit cursor-pointer hover:bg-slate-300 bg-slate-200 dark:hover:bg-slate-600 dark:bg-slate-700 rounded-full px-4 py-2 mr-3 my-3 ${blok.additionalCSS}`}>
      <div className="flex flex-row items-center justify-center">
        <div className="mr-2 text-xl">
          {blok.icon && <i className={blok.icon} />}
          {blok.svgFallbackIcon && blok.svgFallbackIcon.filename && (
            <Image
              src={blok.svgFallbackIcon.filename}
              alt={blok.svgFallbackIcon.alt}
              width={20}
              height={20}
              className="svg-fallback-icon"
            />
          )}
        </div>
        <div className="text-gray-800 dark:text-slate-100 font-semibold">
          {blok.title}
        </div>
      </div>
    </div>
  );
};

export default SkillChip;
