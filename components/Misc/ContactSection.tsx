import { FaEnvelope } from 'react-icons/fa';
import SocialButtonData from '../../types/social-button';
import StaticsData from '../../types/statics';
import SocialMediaIcon from './SocialMediaIcon';

/**
 * Data a ContactSection must provide.
 */
interface ContactSectionData {
  id: number;
  __component: string;
  title: string;
  subtitle: string | null;
  destinationEmail: string;
  socialButtons: {
    data: SocialButtonData[] | null;
  };
  htmlAnchor: string | null;
}

/**
 * Props for the ContactSection component.
 */
interface ContactSectionProps {
  data: ContactSectionData;
  statics: StaticsData;
}

const ContactSection = ({ data, statics }: ContactSectionProps) => {
  return (
    <div
      id={data.htmlAnchor !== null ? data.htmlAnchor : ''}
      className="w-screen dark:bg-slate-800 bg-slate-100 pb-20">
      {/* Wrapper */}
      <div className="container mx-auto flex flex-col justify-center items-center">
        {/* Title */}
        <h1 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-20 text-center mx-4 sm:mx-0">
          {data.title}
        </h1>

        {/* Subtitle */}
        {data.subtitle !== null && (
          <h2 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center mx-4 sm:mx-0">
            {data.subtitle}
          </h2>
        )}

        {/* Destination Email */}
        <a
          className={`hover:bg-slate-300 bg-slate-200 rounded cursor-pointer py-5 px-5
                    text-md mx-auto transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
                    flex flex-row justify-center items-center border border-slate-300 hover:border-slate-600
                    dark:border-slate-500 dark:hover:border-slate-200`}>
          <FaEnvelope className="text-2xl mr-5" />
          <a
            href={`mailto:${data.destinationEmail}?subject=Inquiry regarding &body=%0D%0A%0D%0Avia fabiancdng.com`}
            className="font-medium">
            {data.destinationEmail}
          </a>
        </a>

        {/* Socials */}
        <div className="flex mt-10">
          {data.socialButtons.data?.map((button, index) => (
            <SocialMediaIcon
              key={index}
              title={button.attributes.title}
              url={button.attributes.url}
              icon={button.attributes.icon}
              additonalCSS={`hover:bg-slate-300 bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600
              border border-slate-300 hover:border-slate-600 dark:border-slate-600 dark:hover:border-slate-200`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
