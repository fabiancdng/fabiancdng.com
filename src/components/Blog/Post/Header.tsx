import { Post, PostMetadata, Tag } from '@/types';
import Author from '../Author';
import { getTags } from '@/adapters/ContentAdapter';
import Link from 'next/link';
import TagList from './TagList';

interface HeaderProps {
  post: Post;
  metadata: PostMetadata;
  excerpt?: string;
  preview?: boolean;
}

const Header = async ({ post, metadata, excerpt, preview }: HeaderProps) => {
  const tags = await getTags(metadata.tags);

  return (
    <header className="w-full px-0 sm:px-7 mx-auto">
      <TagList tags={tags} />

      {!preview ? (
        <h1 className="text-5xl my-4 leading-[3.5rem] font-semibold">{metadata.title}</h1>
      ) : (
        <Link href={`/blog/${post.slug}`} className="block mt-2">
          <h2 className="text-3xl font-semibold">{metadata.title}</h2>
        </Link>
      )}

      {/* @ts-expect-error Server Component */}
      {preview && <Author slug={metadata.author} publishedAt={metadata.published_at} preview={true} />}

      <p className={`${preview ? 'my-4' : 'my-7'} text-xl text-gray-500 dark:text-gray-300`}>{excerpt || metadata.description}</p>

      {!preview && (
        <div className="post-author my-4">
          {/* @ts-expect-error Server Component */}
          <Author slug={metadata.author} publishedAt={metadata.published_at} preview={false} />
        </div>
      )}
    </header>
  );
};

export default Header;
