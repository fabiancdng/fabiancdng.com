import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';

interface SocialMediaIconProps {
  title: string;
  icon: string;
  url: string;
  additonalCSS?: string;
}

const SocialMediaIcon = ({
  title,
  icon,
  url,
  additonalCSS,
}: SocialMediaIconProps) => {
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
      className={
        'transition-all duration-500 text-2xl p-3 rounded mr-3 ' +
        String(additonalCSS)
      }
      href={url}
      target="fabiancdng">
      {getIconByName(icon)}
    </a>
  );
};

export default SocialMediaIcon;
