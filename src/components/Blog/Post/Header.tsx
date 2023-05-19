import { PostMetadata } from '@/types';
import Author from './Author';

const Header = ({ metadata, excerpt }: { metadata: PostMetadata; excerpt?: string }) => {
  return (
    <header className="w-full px-0 sm:px-7 mx-auto">
      <ul className="post-tags inline-flex gap-x-3 my-5">
        {metadata.tags.map((tag, index) => (
          <li key={index} className="post-tag">
            <a className="text-blue-800 font-semibold text-lg dark:text-slate-400 uppercase" href={`/blog/tags/${tag}`}>
              {tag}
            </a>
          </li>
        ))}
      </ul>

      <h1 className="text-5xl leading-[3.5rem] font-semibold">{metadata.title}</h1>

      <p className="my-7 text-xl text-gray-500 dark:text-gray-300">{excerpt || metadata.description}</p>

      {/* @ts-expect-error Server Component */}
      <Author slug={metadata.author} publishedAt={metadata.published_at} />
    </header>
  );
};

export default Header;
