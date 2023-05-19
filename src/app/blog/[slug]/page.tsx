import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { PostMetadata } from '@/types';
import BlogPost from '@/components/Blog/BlogPost/BlogPost';

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const absPath = process.cwd();

  // Read the file.
  const file = await readFile(`${absPath}/content/blog/${params.slug}/post.md`).catch((err) => {
    return { notFound: true };
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

  return <BlogPost metadata={postData} content={postContent} />;
};

export default BlogPostPage;
