import Image, { StaticImageData } from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  logo?: {
    src: StaticImageData;
    alt: string;
    sizes?: string;
  };
}

const HeroSection = ({ title, subtitle, description, logo }: HeroSectionProps) => {
  return (
    <div className="container mx-auto mb-20">
      <div className="min-h-screen flex flex-col justify-center align-middle dark:bg-slate-900">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-10 lg:mt-25">
          {/* Text & Socials */}
          <div className="flex flex-1 flex-col items-center lg:items-start">
            <h2
              className="text-4xl lg:text-5xl text-center font-semibold lg:text-left text-slate-700
                dark:text-slate-200">
              {subtitle}
            </h2>
            <h1
              className="text-5xl lg:text-6xl text-center
                    lg:text-left my-5 font-bold 
                    bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
              {title}
            </h1>
            <h3
              className="text-2xl lg:text-3xl text-center font-medium lg:text-left mb-7 text-gray-700
                    dark:text-slate-300">
              {description}
            </h3>
          </div>

          {/* Logo */}
          {logo && (
            <div className="flex justify-center flex-1 lg:mb-0 z-10">
              <div className="lg:w-3/6 w-5/12">
                <Image src={logo.src} alt={logo.alt} sizes={logo.sizes} priority className="rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
