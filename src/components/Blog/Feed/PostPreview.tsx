import { Post } from '@/types';
import PostHeader from '../PostHeader';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostThumbnail } from '@/adapters/ContentAdapter';

const PostPreview = ({ post }: { post: Post }) => {
  const thumbnail = getBlogPostThumbnail(post.slug);

  return (
    <article className="flex flex-col lg:flex-row lg:p-0 space-y-7 lg:space-y-2 mt-36 mb-28 px-14 items-start">
      {/* Thumbnail */}
      <div className="lg:w-2/3 w-full px-0 sm:px-7 mx-auto">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={thumbnail.source}
            width={thumbnail.dimensions.width}
            height={thumbnail.dimensions.height}
            alt={'Thumbnail for the blog post'}
            className="rounded-md"
          />
        </Link>
      </div>

      {/* Post tags, title, author, date excerpt and link */}
      <div className="lg:w-fit lg:pl-10">
        {/* @ts-expect-error Server Component */}
        <PostHeader post={post} metadata={post.metadata} excerpt={post.excerpt} preview={true} />
        {/* 'Read the article' link */}
        <Link className="text-blue-800 font-semibold block mt-7 text-lg dark:text-slate-400 uppercase sm:px-7" href={`/blog/${post.slug}`}>
          Read the article
        </Link>
      </div>
    </article>
  );
};

export default PostPreview;
