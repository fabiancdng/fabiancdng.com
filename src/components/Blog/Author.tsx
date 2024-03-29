import { WP_Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const Author = async ({
  author,
  publishedAt,
  preview,
}: {
  author: WP_Post['_embedded']['author'][0];
  publishedAt: Date;
  preview?: boolean;
}) => {
  return (
    <div className="post-author w-fit">
      <Link className="w-fit" href={`/authors/${author.slug}`}>
        <div className="flex items-center my-4">
          <Image
            src={author['simple_local_avatar']['192']}
            alt={`${author.name} profile picture`}
            width={192}
            height={192}
            className="w-14 h-14 mr-2 rounded-full"
            priority={preview ? false : true}
          />

          <div className="block py-4 mt-1 ml-1">
            <p className="text-lg font-medium leading-3 mb-1">{author.name}</p>
            <p className="text-gray-600 text-md dark:text-slate-400">
              {publishedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Author;
