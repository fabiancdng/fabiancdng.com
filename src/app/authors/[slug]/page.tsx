import { getAllAuthorSlugs, getAllBlogPostsByAuthor, getAuthorBySlug } from '@/adapters/ContentAdapter';
import { Metadata } from 'next';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import { notFound } from 'next/navigation';
import { getImage } from '@/adapters/ImageAdapter';
import Image from 'next/image';
import PostGrid from '@/components/Blog/Feed/Grid/PostGrid';

/**
 * If a request comes in to a page that exists in the file system, but has not been built yet,
 * generate the page on the fly and cache it.
 */
export const dynamicParams = true;

/**
 * Revalidate the cache for this page after 30 minutes as content might change.
 */
export const revalidate = 30 * 60;

/**
 * Dynamically/statically generate metadata for the blog post.
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | null> {
  const author = await getAuthorBySlug(params.slug);

  if (!author) return null;

  return {
    title: `${author.metadata.name} | Author | fabiancdng.com`,
    description: author.content,
    alternates: {
      canonical: `/blog/authors/${author.metadata.slug}`,
    },
    twitter: {
      ...twitterBaseMetadata,
      title: `${author.metadata.name} | Author | fabiancdng.com`,
      description: author.content,
    },
    openGraph: {
      ...openGraphBaseMetadata,
      url: `/blog/authors/${author.metadata.slug}`,
      title: `${author.metadata.name} | Author | fabiancdng.com`,
      description: author.content,
    },
  };
}

/**
 * An author page on the website.
 */
const AuthorPage = async ({ params }: { params: { slug: string } }) => {
  const author = await getAuthorBySlug(params.slug);
  const authorAvatar = getImage(`/authors/${params.slug}`, 'avatar.jpg');

  // If the tag doesn't exist, return a 404.
  if (!author) notFound();

  const posts = await getAllBlogPostsByAuthor(author.metadata.slug);

  return (
    <main>
      <article className="container pt-20 mx-auto px-20 lg:px-0 mb-20 max-w-5xl text-black dark:text-white">
        {/* Responsive section with the author's profile picture on the left and their name, bio and socials on the right */}
        <header className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
          {/* Profile picture */}
          {authorAvatar ? (
            <div className="flex-shrink-0 overflow-hidden rounded-full">
              <div className="w-52">
                <Image
                  src={authorAvatar.source}
                  alt={`${author.metadata.name}'s profile picture}`}
                  width={authorAvatar.dimensions.width}
                  height={authorAvatar.dimensions.height}
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
            <h1 className="text-4xl font-bold text-center md:text-left">{author.metadata.name}</h1>
            <p className="text-center md:text-left text-gray-600 dark:text-slate-400 text-lg">{author.content}</p>
            <div className="flex items-center space-x-4">
              {/* Website link */}
              {author.metadata.homepage && (
                <a
                  className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                  href={author.metadata.homepage}
                  target="_blank">
                  <i className="fa-solid fa-globe mr-2 text-xl" />
                  <p className="mr-1">Website</p>
                </a>
              )}

              {/* Twitter link */}
              {author.metadata.twitter && (
                <a
                  className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                  href={`https://twitter.com/${author.metadata.twitter}`}
                  target="_blank">
                  <i className="fa-brands fa-twitter mr-2 text-xl" />
                  <p className="mr-1">Twitter</p>
                </a>
              )}

              {/* GitHub link */}
              {author.metadata.github && (
                <a
                  className="flex items-center w-fit dark:hover:bg-slate-500 dark:bg-slate-700 dark:text-white hover:bg-slate-300 bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                  href={`https://github.com/${author.metadata.github}`}
                  target="_blank">
                  <i className="fa-brands fa-github mr-2 text-xl" />
                  <p className="mr-1">GitHub</p>
                </a>
              )}
            </div>
          </div>
        </header>
      </article>

      <div className="container mx-auto px-10">
        <hr className="w-full border-gray-300 dark:border-slate-600 my-10" />
      </div>

      {/* Author's latest blog posts */}
      <section className="container mx-auto flex flex-col items-center md:items-start px-10">
        <h2 className="text-4xl text-center md:text-start font-semibold mb-14">Latest posts by {author.metadata.name.split(' ')[0]}</h2>
        <PostGrid posts={posts} />
      </section>
    </main>
  );
};

/**
 * Export possible paths for this page.
 */
export async function generateStaticParams() {
  const authorSlugs = await getAllAuthorSlugs();
  return authorSlugs.map((slug) => ({ slug }));
}

export default AuthorPage;
