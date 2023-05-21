import { Post, PostMetadata, Tag } from '@/types';
import Author from './Author';
import { getTags } from '@/adapters/ContentAdapter';
import Link from 'next/link';

interface PostHeaderProps {
  post: Post;
  metadata: PostMetadata;
  excerpt?: string;
  preview?: boolean;
}

const PostHeader = async ({ post, metadata, excerpt, preview }: PostHeaderProps) => {
  const tags = await getTags(metadata.tags);

  return (
    <header className="w-full px-0 sm:px-7 mx-auto">
      <ul className="post-tags inline-flex">
        {tags.map((tag, index) => (
          <li key={index} className="post-tag">
            <Link className="text-blue-800 font-semibold text-lg dark:text-slate-400 uppercase" href={`/blog/tags/${tag.slug}`}>
              {tag.name}
            </Link>
            {/* '/' in between the tags */}
            {index !== tags.length - 1 && <span className="text-gray-500 font-semibold mx-2 dark:text-gray-300">/</span>}
          </li>
        ))}
      </ul>

      {!preview ? (
        <h1 className="text-5xl leading-[3.5rem] font-semibold">{metadata.title}</h1>
      ) : (
        <Link href={`/blog/${post.slug}`} className="block mt-2">
          <h2 className="text-3xl font-semibold">{metadata.title}</h2>
        </Link>
      )}

      {/* @ts-expect-error Server Component */}
      {preview && <Author slug={metadata.author} publishedAt={metadata.published_at} />}

      <p className="my-4 text-xl text-gray-500 dark:text-gray-300">{excerpt || metadata.description}</p>

      {/* @ts-expect-error Server Component */}
      {!preview && <Author slug={metadata.author} publishedAt={metadata.published_at} />}
    </header>
  );
};

export default PostHeader;
