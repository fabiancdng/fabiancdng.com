import { WP_Post } from '@/types';
import Thumbnail from './Thumbnail';
import Header from './Header';
import PostShare from './PostShare';
import styles from './Post.module.css';

const Post = ({ post }: { post: WP_Post }) => {
  const thumbnail = post['_embedded']['wp:featuredmedia'][0];

  return (
    <>
      <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
        {/* @ts-expect-error Server Component */}
        <Header post={post} />
        <Thumbnail image={thumbnail} priority={true} />
        <div className="post-body max-w-3xl mx-auto">
          <div className={styles.wordPressContent} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </article>

      <PostShare text={post.title.rendered} link={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/${post.slug}`} />
    </>
  );
};

export default Post;
