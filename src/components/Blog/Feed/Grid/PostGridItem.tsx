import { stripHtmlFromExcerpt } from '@/app/utils';
import { WP_Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const PostGridItem = ({ post }: { post: WP_Post }) => {
  const thumbnail = post['_embedded']['wp:featuredmedia'][0];

  return (
    <article className="flex flex-col items-center md:items-start justify-between space-y-5">
      {/* The post's thumbnail */}
      <div className="flex flex-col items-center md:items-start space-y-7">
        {thumbnail && (
          <div className="overflow-hidden rounded-lg">
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={thumbnail.source_url}
                alt={thumbnail.alt_text}
                width={thumbnail.media_details.width}
                height={thumbnail.media_details.height}
                sizes="(max-width: 1024px) 35vw
                                  (max-width: 768px) 25vw,
                                  90vw"
                className="rounded-lg"
              />
            </Link>
          </div>
        )}

        {/* The post's title */}

        <h3 className="text-2xl text-center md:text-start font-semibold">
          <Link href={`/blog/${post.slug}`}>{post.title.rendered}</Link>
        </h3>

        {/* The post's excerpt */}
        {post.excerpt && (
          <p className=" text-gray-600 dark:text-slate-400 text-center md:text-start text-lg">
            {stripHtmlFromExcerpt(post.excerpt.rendered)}
          </p>
        )}
      </div>

      <Link
        className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
        href={`/blog/${post.slug}`}>
        <p className="mr-1">Read the article</p>
        <i className="fa-solid fa-arrow-right mr-2 text-xl" />
      </Link>
    </article>
  );
};

export default PostGridItem;
