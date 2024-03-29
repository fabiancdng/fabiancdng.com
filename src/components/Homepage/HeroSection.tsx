import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const SocialMediaLink = ({ href, icon }: { href: string; icon: string }) => {
  return (
    <Link
      href={href}
      type="button"
      target="_blank"
      className={`w-12 h-12 flex justify-center items-center rounded-full bg-slate-200 hover:bg-slate-100 hover:opacity-100 opacity-60 transition-all ease-in-out text-2xl text-black`}>
      <i className={`${icon}`}></i>
    </Link>
  );
};

const HeroSection = ({ title, subtitle, description }: HeroSectionProps) => {
  return (
    <div className="container mx-auto mb-20">
      <div className="min-h-screen flex flex-col justify-center items-center dark:bg-slate-900">
        <video
          loop
          autoPlay
          controls
          muted
          className="object-cover absolute top-0 left-0 right-0 bottom-0 blur-[2px] w-full h-full z-0 scale-105">
          <source src="/video/background.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay absolute top-0 left-0 bottom-0 right-0 z-10 bg-[rgba(0,0,0,0.6)] scale-105"></div>

        <div className="hero-content z-20 max-w-[60rem] px-10">
          {/* Text & Socials */}
          <h2 className="text-[3rem] leading-[1] text-center font-semibold lg:text-left text-slate-200">{subtitle}</h2>
          <h1 className="text-[4rem] leading-[1] text-center lg:text-left my-5 font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p
            className="text-[2rem] leading-[1.3] text-center font-medium lg:text-left mb-7 text-slate-300"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Vertically aligned social media buttons (with Icon) in the bottom right corner */}
        <div className="socials z-20 absolute bottom-0 xl:left-28 lg:left-10 lg:block hidden">
          <ul className="flex flex-col space-y-3 after:w-[3px] after:h-24 after:mt-5 after:mx-auto after:opacity-60 after:bg-slate-200">
            <li>
              <SocialMediaLink href="https://github.com/fabiancdng" icon="fab fa-github" />
            </li>

            <li>
              <SocialMediaLink href="https://twitter.com/fabiancdng" icon="fab fa-twitter" />
            </li>

            <li>
              <SocialMediaLink href="mailto:fabian@fabiancdng.com" icon="fas fa-envelope" />
            </li>
          </ul>
        </div>
        {/* Animated arrow at the bottom (in the middle of the screen) of the hero section signaling that you can scroll down */}
        <div className="arrow z-20 absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 flex flex-col items-center space-y-2">
          <p className="text-slate-200 opacity-60 uppercase text-sm">Scroll down to continue</p>
          <i className="fas fa-chevron-down text-4xl animate-bounce text-slate-200 opacity-50"></i>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
