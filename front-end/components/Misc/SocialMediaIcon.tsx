import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';

interface SocialMediaIconProps {
  title: string;
  icon: string;
  url: string;
}

const SocialMediaIcon = ({ title, icon, url }: SocialMediaIconProps) => {
  /**
   * Get a Bs (Bootstrap) or Fa (Font Awesome) Icon from the react-icons library by its name provided as a string.
   */
  const getIconByName = (name: string) => {
    var IconComponent: any;

    // Filter correct icon set.
    if (name.startsWith('Bs')) {
      IconComponent = BsIcons[name];
    } else if (name.startsWith('Fa')) {
      IconComponent = FaIcons[name];
    }

    // If the icon is not found, return BsShieldX icon as placeholder.
    if (!IconComponent) {
      return <BsIcons.BsShieldX />;
    }

    return <IconComponent />;
  };

  return (
    <a
      className="hover:bg-slate-300 bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 transition-all duration-500 text-2xl p-3 rounded mr-3"
      href={url}
      target="fabiancdng">
      {getIconByName(icon)}
    </a>
  );
};

export default SocialMediaIcon;
