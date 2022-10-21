import { BsShieldX } from 'react-icons/bs';

interface socialMediaIconProps {
  title: string;
  icon: string;
  href: string;
  additonalCSS?: string;
}

const SocialMediaIcon = (props: socialMediaIconProps) => {
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
    }

    // If the icon is not found, return BsShieldX icon as placeholder.
    if (!IconComponent) {
      return <BsShieldX />;
    }

    return <IconComponent />;
  };

  return (
    <a
      className={
        'transition-all duration-500 text-2xl p-3 rounded mr-3 ' +
        String(props.additonalCSS)
      }
      href={props.href}
      target="fabiancdng">
      {getIconByName(props.icon)}
    </a>
  );
};

export default SocialMediaIcon;
