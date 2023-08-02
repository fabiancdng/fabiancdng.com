import { Post } from '@/types';
import Header from '../Post/Header';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostThumbnail } from '@/adapters/ContentAdapter';

const PostPreview = ({ post }: { post: Post }) => {
  const thumbnail = getBlogPostThumbnail(post.slug);

  return (
    <article className="flex flex-col lg:flex-row lg:p-0 space-y-7 lg:space-y-2 mt-36 mb-28 px-14 items-start">
      {/* Thumbnail */}
      <div className="lg:w-5/12 w-full px-0 sm:px-7 mx-auto">
        <Link href={`/blog/${post.slug}`}>
          <div className="w-full">
            <Image
              src={thumbnail.source}
              width={thumbnail.dimensions.width}
              height={thumbnail.dimensions.height}
              alt={post.metadata.title}
              className="rounded-md"
            />
          </div>
        </Link>
      </div>

      {/* Post tags, title, author, date excerpt and link */}
      <div className="lg:w-7/12 w-full">
        {/* @ts-expect-error Server Component */}
        <Header post={post} metadata={post.metadata} excerpt={post.excerpt} preview={true} />
        {/* Read more link */}
        <Link
          href={`/blog/${post.slug}`}
          className={
            'text-blue-500 hover:text-blue-600 dark:text-slate-200 dark:hover:text-slate-100 text-lg mt-3 w-full px-0 sm:px-7 mx-auto'
          }>
          Read the article &rarr;
        </Link>
      </div>
    </article>
  );
};

export default PostPreview;
