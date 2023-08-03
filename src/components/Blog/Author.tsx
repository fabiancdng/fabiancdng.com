import { WP_Post } from '@/types';
import Image from 'next/image';

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
      <a className="w-fit" href="/authors/fabiancdng">
        <div className="flex items-center my-4">
          <Image
            src={author.avatar_urls[48]}
            alt={`${author.name} profile picture`}
            width={48}
            height={48}
            className="w-14 h-14 mr-2 rounded-full"
            priority={preview ? false : true}
          />

          <div className="block py-4 mt-1 ml-1">
            <p className="text-lg font-medium leading-3 mb-1">{author.name}</p>
            <p className="text-gray-600 text-md dark:text-slate-400">
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Author;
