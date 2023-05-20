import { PostMetadata } from '@/types';
import Author from './Author';

const PostHeader = ({ metadata, excerpt, preview }: { metadata: PostMetadata; excerpt?: string; preview?: boolean }) => {
  return (
    <header className="w-full px-0 sm:px-7 mx-auto">
      <ul className="post-tags inline-flex gap-x-3">
        {metadata.tags.map((tag, index) => (
          <li key={index} className="post-tag">
            <a className="text-blue-800 font-semibold text-lg dark:text-slate-400 uppercase" href={`/blog/tags/${tag}`}>
              {tag}
            </a>
          </li>
        ))}
      </ul>

      {!preview ? (
        <h1 className="text-5xl leading-[3.5rem] font-semibold">{metadata.title}</h1>
      ) : (
        <h2 className="text-3xl font-semibold mt-2">{metadata.title}</h2>
      )}

      {preview && <Author slug={metadata.author} publishedAt={metadata.published_at} />}

      <p className={`${preview ? 'my-0' : 'my-5'} text-xl text-gray-500 dark:text-gray-300`}>{excerpt || metadata.description}</p>

      {!preview && <Author slug={metadata.author} publishedAt={metadata.published_at} />}
    </header>
  );
};

export default PostHeader;
