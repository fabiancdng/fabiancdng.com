import Link from 'next/link';
import codeBannerJpg from '../../../../public/img/code-banner.jpg';
import Image from 'next/image';
import SignUpForm from '../Newsletter/SignUpForm';

interface BlogBannerProps {
  title: string;
  description: string;
  linkTitle: string;
  link: string;
}

const BlogBanner = ({ title, description, linkTitle, link }: BlogBannerProps) => {
  return (
    <div className="banner relative pt-24 py-12 sm:px-20 px-10 mx-auto shadow-lg">
      <Image
        src={codeBannerJpg}
        priority
        alt="Code banner background image"
        className="z-0 object-cover object-center blur-sm brightness-75 scale-105"
        fill
      />
      <div className="relative flex flex-col space-y-10 items-center max-w-6xl mx-auto mt-12 z-1">
        <h1 className="text-6xl text-center text-white font-bold z-1">{title}</h1>
        <h3 className="text-3xl text-center font-semibold text-white z-1">{description}</h3>

        {/*  Sign up to newsletter input */}
        <SignUpForm />

        <p className="text-sm text-center text-slate-200 mt-2 sm:mt-0 sm:ml-5">
          Newsletter currently under maintenance, follow me on{' '}
          <a className="text-slate-200 underline" href="https://dev.to/fabiancdng" target="_blank">
            dev.to
          </a>{' '}
          or{' '}
          <a className="text-slate-200 underline" href="https://twitter.com/fabiancdng" target="_blank">
            Twitter
          </a>{' '}
          to know when there's new content.
        </p>

        <p className="relative mt-5 text-center sm:text-left z-1 text-white">
          <Link className="text-lg font-medium underline" href={link}>
            {linkTitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BlogBanner;
