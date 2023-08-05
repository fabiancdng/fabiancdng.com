import { WP_Post } from '@/types';
import Author from '../Author';
import Link from 'next/link';
import CategoryList from './CategoryList';
import { stripHtmlFromExcerpt } from '@/app/utils';

interface HeaderProps {
  post: WP_Post;
  preview?: boolean;
}

const Header = async ({ post, preview }: HeaderProps) => {
  const author = post['_embedded']['author'][0];
  const categories = post['_embedded']['wp:term'][0];
  // const tags = post['_embedded']['wp:term'][1];

  return (
    <header className="w-full px-0 sm:px-7 mx-auto">
      <CategoryList categories={categories} />

      {!preview ? (
        <h1 className="text-5xl my-4 leading-[3.5rem] font-semibold">{post.title.rendered}</h1>
      ) : (
        <Link href={`/blog/${post.slug}`} className="block mt-2">
          <h2 className="text-3xl font-semibold">{post.title.rendered}</h2>
        </Link>
      )}

      {preview && <Author author={author} publishedAt={new Date(post.date)} preview={true} />}

      <p className={`${preview ? 'my-4' : 'my-7'} text-xl text-gray-500 dark:text-gray-300`}>
        {stripHtmlFromExcerpt(post.excerpt.rendered)}
      </p>

      {!preview && (
        <div className="post-author my-4">
          <Author author={author} publishedAt={new Date(post.date)} preview={false} />
        </div>
      )}
    </header>
  );
};

export default Header;
