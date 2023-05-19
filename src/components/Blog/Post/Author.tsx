import { getAuthorBySlug } from '@/adapters/ContentAdapter';
import Image from 'next/image';

const Author = async ({ slug, publishedAt }: { slug: string; publishedAt: Date }) => {
  const author = await getAuthorBySlug(slug);

  if (!author) return null;

  return (
    <div className="post-author w-fit">
      <a className="w-fit" href="/authors/fabiancdng">
        <div className="flex items-center my-8">
          {/* <img
            alt="Fabian Reinders's profile picture"
            className="w-12 h-12 mr-2 rounded-full"
            src="/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fa.storyblok.com%2Ff%2F213297%2F962x901%2Fe636e7c9eb%2Fpb.JPG&amp;w=128&amp;q=75"
          /> */}

          <Image
            src={`/api/content/images/authors/${slug}/img/avatar.jpg?token=${process.env.PUBLIC_IMAGE_API_KEY}`}
            alt={`${author.metadata.name} profile picture`}
            width={200}
            height={200}
            className="w-14 h-14 mr-2 rounded-full"
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
