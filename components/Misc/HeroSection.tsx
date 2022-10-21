import SocialMediaIcon from './SocialMediaIcon';

interface socialButton {
  title: string;
  href: string;
  icon: string;
}

/**
 * Data from the CMS for a HeroSection component.
 */
interface heroSectionProps {
  title: string;
  subtitle: string;
  description: string | null;
  logoURL: string;
  htmlAnchor: string;
  socialButtons: socialButton[] | null;
}

const HeroSection = (props: heroSectionProps) => {
  return (
    <div
      id={props.htmlAnchor}
      className="h-screen flex flex-col justify-center align-middle dark:bg-slate-900">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-10 lg:mt-25">
        {/* Text & Socials */}
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <h1
            className="text-4xl lg:text-6xl text-center
                    lg:text-left mb-4 font-bold dark:text-slate-50">
            {props.title}
          </h1>
          <h2
            className="text-3xl lg:text-5xl text-center lg:text-left text-slate-700
                    mb-4 dark:text-slate-200">
            {props.subtitle}
          </h2>
          <h3
            className="text-2xl lg:text-3xl text-center lg:text-left mb-7 text-gray-500
                    dark:text-slate-400">
            {props.description}
          </h3>

          {/* Socials */}
          <div className="flex flex-row justify-center lg:justify-start">
            {props.socialButtons?.map((button, index) => (
              <SocialMediaIcon
                key={index}
                title={button.title}
                href={button.href}
                icon={button.icon}
                additonalCSS={`hover:bg-slate-200 bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-500
                        border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200`}
              />
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center flex-1 lg:mb-0 z-10">
          <img
            src={props.logoURL}
            className="lg:w-3/6 lg:h-3/6 w-3/4 h-4/4 rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
