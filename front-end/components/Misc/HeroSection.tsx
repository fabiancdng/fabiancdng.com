import ImageData from '../../types/image';
import StaticsData from '../../types/statics';
import SocialMediaIcon from './SocialMediaIcon';

/**
 * Data of a social media button.
 */
interface SocialButton {
  id: number;
  attributes: {
    title: string;
    url: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Data from the CMS for a HeroSection component.
 */
interface HeroSectionData {
  id: number;
  __component: string;
  title: string;
  subtitle: string;
  description: string | null;
  backgroundImage: {
    data: ImageData | null;
  };
  logo: {
    data: ImageData | null;
  };
  htmlAnchor: string;
  socialButtons: {
    data: SocialButton[] | null;
  };
}

/**
 * Props for the HeroSection component.
 */
interface HeroSectionProps {
  data: HeroSectionData;
  statics: StaticsData;
}

const HeroSection = ({ data, statics }: HeroSectionProps) => {
  console.log(data);
  return (
    <div
      id={data.htmlAnchor}
      className="h-screen flex flex-col justify-center align-middle dark:bg-slate-900">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-10 lg:mt-25">
        {/* Text & Socials */}
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <h1
            className="text-4xl lg:text-6xl text-center
                    lg:text-left mb-4 font-bold dark:text-slate-50">
            {data.title}
          </h1>
          <h2
            className="text-3xl lg:text-5xl text-center lg:text-left text-slate-700
                    mb-4 dark:text-slate-200">
            {data.subtitle}
          </h2>
          <h3
            className="text-2xl lg:text-3xl text-center lg:text-left mb-7 text-gray-500
                    dark:text-slate-400">
            {data.description}
          </h3>

          {/* Socials */}
          <div className="flex flex-row justify-center lg:justify-start">
            {data.socialButtons.data?.map((button, index) => (
              <SocialMediaIcon
                key={index}
                title={button.attributes.title}
                url={button.attributes.url}
                icon={button.attributes.icon}
              />
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center flex-1 lg:mb-0 z-10">
          <img
            src={statics.STRAPI_URL + data.logo.data?.attributes.url}
            className="lg:w-3/6 lg:h-3/6"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
