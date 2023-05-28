import { getAuthorBySlug } from '@/adapters/ContentAdapter';
import { getImage } from '@/adapters/ImageAdapter';
import Image from 'next/image';

const Author = async ({ slug, publishedAt, preview }: { slug: string; publishedAt: Date; preview?: boolean }) => {
  const author = await getAuthorBySlug(slug);
  const authorImage = getImage(`/authors/${slug}`, 'avatar.jpg');

  if (!author) return null;

  return (
    <div className="post-author w-fit">
      <a className="w-fit" href="/authors/fabiancdng">
        <div className="flex items-center my-4">
          <Image
            src={authorImage.source}
            alt={`${author.metadata.name} profile picture`}
            width={authorImage.dimensions.width}
            height={authorImage.dimensions.height}
            className="w-14 h-14 mr-2 rounded-full"
            priority={preview ? false : true}
          />

          <div className="block py-4 mt-1 ml-1">
            <p className="text-lg font-medium leading-3 mb-1">{author.metadata.name}</p>
            <p className="text-gray-600 text-md dark:text-slate-400">
              {publishedAt.toLocaleDateString('en-US', {
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
