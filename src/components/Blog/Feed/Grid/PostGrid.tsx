import { WP_Post } from '@/types';
import PostPreview from './PostGridItem';

const PostGrid = ({ posts }: { posts: WP_Post[] }) => {
  return (
    <div className="grid grid-cols-1 gap-x-20 gap-y-20 md:gap-x-10 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostPreview key={index} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;
