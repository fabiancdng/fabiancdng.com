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
        <video
          loop
          autoPlay
          controls
          muted
          className="object-cover absolute top-0 left-0 right-0 bottom-0 blur-[2px] w-full h-full z-0 scale-105">
          <source src="/video/background.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay scale-105 absolute top-0 left-0 bottom-0 right-0 z-10 bg-[rgba(0,0,0,0.6)]"></div>

        <div className="hero-content z-20">
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-10 lg:mt-25">
            {/* Text & Socials */}
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h2 className="text-4xl lg:text-5xl text-center font-semibold lg:text-left text-slate-200">{subtitle}</h2>
              <h1
                className="text-5xl lg:text-6xl text-center
                    lg:text-left my-5 font-bold 
                    bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
                {title}
              </h1>
              <h3 className="text-2xl lg:text-3xl text-center font-medium lg:text-left mb-7  text-slate-300">{description}</h3>
            </div>

            {/* Logo */}
            {logo && (
              <div className="flex justify-center flex-1 lg:mb-0 z-10">
                <div className="lg:w-[40%] w-5/12">
                  <Image src={logo.src} alt={logo.alt} sizes={logo.sizes} priority className="rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
