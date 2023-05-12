import { ISbStoryData } from '@storyblok/react';
import { PostOrPageAuthor } from '../../../types';
import Link from 'next/link';
import Image from 'next/image';
import PostTagList from './PostTagList';

/**
 * Data for the blog post relevant for header from Storyblok.
 */
interface PostHeaderProps {
  story: ISbStoryData;
  excerpt: string;
  author: PostOrPageAuthor;
}

/**
 * Renders the header of a blog post (Tags, Headline, Excerpt, Author).
 */
const PostHeader = ({ story, excerpt, author }: PostHeaderProps) => {
  return (
    <header className="w-full px-0 sm:px-7 mx-auto">
      {/* Post tags */}
      {story.tag_list && (
        <PostTagList addCSSClasses="my-5" tagList={story.tag_list} />
      )}

      {/* Post title */}
      {story.name && (
        <h1 className="text-5xl leading-[3.5rem] font-semibold">
          {story.name}
        </h1>
      )}

      {/* Post excerpt */}
      {excerpt && (
        <p className="my-7 text-xl text-gray-500 dark:text-gray-300">
          {excerpt}
        </p>
      )}

      {/* Post author */}
      <div className="w-fit">
        <Link href={`/authors/${author.slug}`} className="w-fit">
          <div className="flex items-center my-8">
            <Image
              className="w-12 h-12 -translate-y-0.5 mr-2 rounded-full"
              width={50}
              height={50}
              priority
              src={author.content.avatar?.filename || ''}
              alt={author.name + "'s profile picture"}
            />
            <div>
              <p className="text-lg font-medium leading-3 mb-1">
                {author.name}
              </p>
              <p className="text-gray-600 text-md dark:text-slate-400">
                {story.first_published_at &&
                  new Date(story.first_published_at).toLocaleString('en-US', {
                    dateStyle: 'long',
                  })}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default PostHeader;
