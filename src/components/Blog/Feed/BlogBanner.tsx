import Link from 'next/link';
import codeBannerJpg from '../../../../public/img/code-banner.jpg';
import Image from 'next/image';

interface BlogBannerProps {
  title: string;
  subtitle: string;
  description: string;
  linkTitle: string;
  link: string;
}

const BlogBanner = ({ title, subtitle, description, linkTitle, link }: BlogBannerProps) => {
  return (
    <div className="relative py-28 sm:px-20 px-10 mx-auto shadow-lg">
      <Image
        src={codeBannerJpg}
        priority
        alt="Code banner background image"
        className="z-0 object-cover object-center blur-sm scale-105"
        fill
      />
      <div className="relative max-w-6xl mx-auto mt-12 z-1">
        <h1 className="text-6xl mt-5 text-white font-bold text-center sm:text-left z-1">{title}</h1>
        <h2 className="text-4xl mt-5 font-semibold text-center sm:text-left text-white z-1">{subtitle}</h2>
        <h3 className="text-2xl mt-5 font-semibold text-center sm:text-left text-white z-1">{description}</h3>

        <p className="relative mt-5 text-center sm:text-left z-1 text-white">
          <Link className="text-xl font-medium underline" href={link}>
            {linkTitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BlogBanner;
