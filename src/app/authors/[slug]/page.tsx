import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PostGrid from '@/components/Blog/Feed/Grid/PostGrid';
import { WP_Post, WP_User } from '@/types';
import { getWpRessource } from '@/adapters/WordPressAdapter';

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  // Get the full user from WordPress.
  const authors: WP_User[] = await getWpRessource('users', {
    slug: params.slug,
    _embed: true,
  });
  const author = authors[0];

  if (!author) return null;

  return {
    title: `${author.name} | Author | fabiancdng.com`,
    description: author.description,
    alternates: {
      canonical: `/blog/authors/${author.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${author.name} | Author | fabiancdng.com`,
      description: author.description,
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/blog/authors/${author.slug}`,
      title: `${author.name} | Author | fabiancdng.com`,
      description: author.description,
    },
  };
}

/**
 * An author page on the website.
 */
const AuthorPage = async ({ params }: { params: { slug: string } }) => {
  // Get the full user from WordPress.
  const authors = await getWpRessource('users', {
    slug: params.slug,
  });
  const author = authors[0];

  // If the tag doesn't exist, return a 404.
  if (!author) notFound();

  // Get the user's posts from WordPress (only needed fields).
  const authorsPosts: WP_Post[] = await getWpRessource('posts', {
    author: author.id,
    _fields: ['slug', 'title', 'excerpt', 'featured_media', '_links', '_embedded'],
    _embed: ['wp:featuredmedia'],
  });

  console.log(authorsPosts[0]['_embedded']);

  return (
    <main>
      <article className="container pt-20 mx-auto px-20 lg:px-0 mb-20 max-w-5xl text-black dark:text-white">
        {/* Responsive section with the author's profile picture on the left and their name, bio and socials on the right */}
        <header className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
          {/* Profile picture */}
          {author.avatar_urls[96] ? (
            <div className="flex-shrink-0 overflow-hidden rounded-full">
              <div className="w-52">
                <Image
                  src={author.avatar_urls[96]}
                  alt={`${author.name}'s profile picture}`}
                  width={200}
                  height={200}
                  sizes="(min-width: 1024px) 25vw
                      (min-width: 1280px) 35vw,
                      45vw"
                  priority
                  className="rounded-full"
                />
              </div>
            </div>
          ) : (
            // When there's no avatar, use Font Awesome's user icon in same size as fallback.
            <div className="flex-shrink-0 overflow-hidden rounded-full bg-slate-400 px-5 pt-2">
              <i className="fa fa-user text-slate-800" style={{ fontSize: '200px' }}></i>
            </div>
          )}

          {/* Name, bio and socials */}
          <div className="flex flex-col items-center justify-center space-y-5 md:items-start">
            <h1 className="text-4xl font-bold text-center md:text-left">{author.name}</h1>
            <p className="text-center md:text-left text-gray-600 dark:text-slate-400 text-lg">{author.description}</p>
            <div className="flex items-center space-x-4">
              {/* Website link */}
              {author.url && (
                <a
                  className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                  href={author.url}
                  target="_blank">
                  <i className="fa-solid fa-globe mr-2 text-xl" />
                  <p className="mr-1">Website</p>
                </a>
              )}

              {/* Twitter link */}
              {/* {author.metadata.twitter && (
                <a
                  className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                  href={`https://twitter.com/${author.metadata.twitter}`}
                  target="_blank">
                  <i className="fa-brands fa-twitter mr-2 text-xl" />
                  <p className="mr-1">Twitter</p>
                </a>
              )} */}

              {/* GitHub link */}
              {/* {author.metadata.github && (
                <a
                  className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                  href={`https://github.com/${author.metadata.github}`}
                  target="_blank">
                  <i className="fa-brands fa-github mr-2 text-xl" />
                  <p className="mr-1">GitHub</p>
                </a>
              )} */}
            </div>
          </div>
        </header>
      </article>

      <div className="container mx-auto px-10">
        <hr className="w-full border-gray-300 dark:border-slate-600 my-10" />
      </div>

      {/* Author's latest blog posts */}
      <section className="container mx-auto flex flex-col items-center md:items-start px-10">
        <h2 className="text-4xl text-center md:text-start font-semibold mb-14">Latest posts by {author.name.split(' ')[0]}</h2>
        <PostGrid posts={authorsPosts} />
      </section>
    </main>
  );
};

/**
 * Export possible paths for this page.
 */
export async function generateStaticParams() {
  // Get all author slugs from WordPress.
  const authorSlugs = await getWpRessource('users', {
    _fields: 'slug',
  });

  return authorSlugs.map((author: { slug: string }) => ({ slug: author.slug }));
}

export default AuthorPage;
