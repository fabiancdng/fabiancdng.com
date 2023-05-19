import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { PostMetadata } from '@/types';
import Post from '@/components/Blog/Post/Post';

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const absPath = process.cwd();

  // Read the file.
  const file = await readFile(`${absPath}/content/blog/${params.slug}/post.md`).catch((err) => {
    return err;
  });

  const postMd = file.toString();

  // Strip and parse metadata.
  const postMatter = matter(postMd, {
    excerpt: true,
  });

  const postData: PostMetadata = postMatter.data as PostMetadata;

  let postContent;
  if (postMatter.excerpt) {
    postContent = postMatter.content.slice(postMatter.excerpt?.length + 3);
  } else {
    postContent = postMatter.content;
  }

  return <Post metadata={postData} content={postContent} />;
};

/**
 * Revalidate page every 60 seconds.
 * Prevents parser from re-parsing the file on every request.
 */
export const revalidate = 60;

export default BlogPostPage;
