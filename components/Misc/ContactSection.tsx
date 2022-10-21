import { FaEnvelope } from 'react-icons/fa';
import SocialMediaIcon from './SocialMediaIcon';

interface socialButton {
  title: string;
  href: string;
  icon: string;
}

/**
 * Props for the ContactSection component.
 */
interface contactSectionProps {
  title: string;
  subtitle: string | null;
  htmlAnchor: string | null;
  destinationEmail: string;
  socialButtons: socialButton[] | null;
}

const ContactSection = (props: contactSectionProps) => {
  return (
    <div
      id={props.htmlAnchor !== null ? props.htmlAnchor : ''}
      className="w-screen dark:bg-slate-800 bg-slate-100 pb-20">
      {/* Wrapper */}
      <div className="container mx-auto flex flex-col justify-center items-center">
        {/* Title */}
        <h1 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-20 text-center mx-4 sm:mx-0">
          {props.title}
        </h1>

        {/* Subtitle */}
        {props.subtitle !== null && (
          <h2 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center mx-4 sm:mx-0">
            {props.subtitle}
          </h2>
        )}

        {/* Destination Email */}
        <div
          className={`hover:bg-slate-300 bg-slate-200 rounded cursor-pointer py-5 px-5
                    text-md mx-auto transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
                    flex flex-row justify-center items-center border border-slate-300 hover:border-slate-600
                    dark:border-slate-500 dark:hover:border-slate-200`}>
          <FaEnvelope className="text-2xl mr-5" />
          <a
            href={`mailto:${props.destinationEmail}?subject=Inquiry regarding &body=%0D%0A%0D%0Avia fabiancdng.com`}
            className="font-medium">
            {props.destinationEmail}
          </a>
        </div>

        {/* Socials */}
        <div className="flex mt-10">
          {props.socialButtons?.map((button, index) => (
            <SocialMediaIcon
              key={index}
              title={button.title}
              href={button.href}
              icon={button.icon}
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
