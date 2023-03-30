import { SbBlokData } from '@storyblok/react';
import React from 'react';
import { BsShieldX } from 'react-icons/bs';

interface SkillChipBlock extends SbBlokData {
  title: string;
  icon: string;
  additionalCSS: string;
}

const SkillChip = ({ blok }: { blok: SkillChipBlock }) => {
  /**
   * Get a Bs (Bootstrap) or Fa (Font Awesome) Icon from the react-icons library by its name provided as a string.
   */
  const getIconByName = (name: string) => {
    var IconComponent: any;

    // Filter correct icon set.
    if (name.startsWith('Bs')) {
      IconComponent = require('react-icons/bs')[name];
    } else if (name.startsWith('Fa')) {
      IconComponent = require('react-icons/fa')[name];
    } else if (name.startsWith('Si')) {
      IconComponent = require('react-icons/si')[name];
    } else if (name.startsWith('Gr')) {
      IconComponent = require('react-icons/gr')[name];
    } else if (name.startsWith('Tb')) {
      IconComponent = require('react-icons/tb')[name];
    }

    // If the icon is not found, return BsShieldX icon as placeholder.
    if (!IconComponent) {
      return <BsShieldX />;
    }

    return <IconComponent />;
  };

  // Chips containing icon and title. The icon is the name of the component from 'react-icons' to render.
  return (
    <div
      className={`flex flex-row items-center w-fit cursor-pointer hover:bg-slate-300 bg-slate-200 dark:hover:bg-slate-600 dark:bg-slate-700 rounded-full px-4 py-2 mr-3 my-3 ${blok.additionalCSS}`}>
      <div className="flex flex-row items-center justify-center">
        <div className="mr-2 text-lg">{getIconByName(blok.icon)}</div>
        <div className="text-gray-800 dark:text-slate-100 font-semibold">
          {blok.title}
        </div>
      </div>
    </div>
  );
};

export default SkillChip;
