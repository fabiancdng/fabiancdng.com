import Image from 'next/image';
import Link from 'next/link';
import { BlogPostStoryData, PostOrPageAuthor } from '../../types';

/**
 * Props for the single item in the collection (BlockPosts.tsx).
 */
interface BlogPostProps {
  story: BlogPostStoryData;
  relations: any;
}

/**
 * Renders a single blog post in the collection (BlockPosts.tsx) (no content, only basic info and link).
 */
const BlogPost = ({ story, relations }: BlogPostProps) => {
  // Filter through the array of relations to find the author object with the matching UUID.
  const author: PostOrPageAuthor = relations.find(
    (relation: any) => relation.uuid === story.content.author
  );

  // Responsive card with image on the left and text on the right.
  return (
    <article className="flex flex-col md:flex-row mt-5 mb-24">
      {/* Thumbnail */}
      <div className="md:w-1/3">
        {/* If the thumbnail is not set, use a placeholder image. */}
        {story.content.thumbnail && (
          <Link href={`/${story.full_slug}`}>
            <Image
              src={story.content.thumbnail.filename}
              width={600}
              height={400}
              alt={story.content.thumbnail.alt}
              className="rounded-md"
            />
          </Link>
        )}
      </div>

      {/* Post tags, title, author, date excerpt and link */}
      <div className="md:w-2/3 md:pl-10 md:mt-0 mt-5">
        <header>
          {/* Post tags */}
          {story.tag_list && (
            <div>
              {story.tag_list.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tags/${tag}`}
                  className="text-blue-800 font-semibold text-lg dark:text-slate-400">
                  {tag.toUpperCase()}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl font-semibold mt-2">
            <Link href={`/${story.full_slug}`}>{story.name}</Link>
          </h2>

          {/* Author and date */}
          {author && (
            <Link href={`/${author.full_slug}`}>
              <div className="flex items-center my-6">
                <Image
                  className="w-12 h-12 -translate-y-0.5 mr-2 rounded-full"
                  width={50}
                  height={50}
                  src={author.content.avatar?.filename || ''}
                  alt={author.name + "'s profile picture"}
                />

                <div>
                  <h3 className="text-lg font-normal leading-3 mb-1">
                    {author.name}
                  </h3>
                  <p className="text-gray-600 text-md dark:text-slate-400">
                    {story.first_published_at &&
                      new Date(story.first_published_at).toLocaleString(
                        'en-US',
                        {
                          dateStyle: 'long',
                        }
                      )}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </header>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-slate-400 my-3">
          {story.content.excerpt}
        </p>

        {/* Read more link */}
        <Link
          href={`/${story.full_slug}`}
          className={
            'text-blue-500 hover:text-blue-600 dark:text-slate-200 dark:hover:text-slate-100'
          }>
          Read more &rarr;
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
