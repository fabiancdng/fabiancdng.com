import Author from './Author';

const Header = () => {
  return (
    <header className="w-full px-0 sm:px-7 mx-auto">
      <ul className="post-tags inline-flex my-5">
        <li className="post-tag">
          <a className="text-blue-800 font-semibold text-lg dark:text-slate-400" href="/blog/tags/Next.js">
            NEXT.JS
          </a>
        </li>
      </ul>

      <h1 className="text-5xl leading-[3.5rem] font-semibold">Pagination in Next.js using SSG</h1>

      <p className="my-7 text-xl text-gray-500 dark:text-gray-300">
        In this blog post, I will break down how I implemented pagination in my Next.js blog using Static Site Generation (SSG). I'll also
        show you how you can easily implement this yourself!
      </p>

      <Author />
    </header>
  );
};

export default Header;
