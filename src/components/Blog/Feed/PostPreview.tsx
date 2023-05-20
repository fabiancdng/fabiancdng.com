import { Post } from '@/types';
import PostHeader from '../PostHeader';
import Link from 'next/link';
import Image from 'next/image';
import { getImageDimensions } from '@/adapters/ImageAdapter';

const PostPreview = ({ post }: { post: Post }) => {
  const thumbnailDimensions = getImageDimensions(`/content/blog/${post.slug}/img/thumbnail.jpg`);
  return (
    <article className="flex flex-col lg:flex-row lg:p-0 space-y-2 mt-5 mb-28 items-center">
      {/* Thumbnail */}
      <div className="lg:w-1/3 w-full">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={`/api/content/images/blog/${post.slug}/img/thumbnail.jpg?token=${process.env.NEXT_PUBLIC_CONTENT_IMAGE_API_KEY}`}
            width={thumbnailDimensions.width}
            height={thumbnailDimensions.height}
            alt={'Thumbnail for the blog post'}
            className="rounded-md"
          />
        </Link>
      </div>

      {/* Post tags, title, author, date excerpt and link */}
      <div className="lg:w-2/3 lg:pl-10">
        <PostHeader metadata={post.metadata} excerpt={post.excerpt} preview={true} />
      </div>
    </article>
  );
};

export default PostPreview;
