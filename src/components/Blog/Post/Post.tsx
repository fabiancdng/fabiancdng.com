import { WP_Post } from '@/types';
import Thumbnail from './Thumbnail';
import Header from './Header';
import PostShare from './PostShare';
import styles from './Post.module.css';
import { getHighlighter } from 'shiki';
import * as cheerio from 'cheerio';

const Post = async ({ post }: { post: WP_Post }) => {
  const thumbnail = post['_embedded']['wp:featuredmedia'][0];

  // Highlight code blocks in the rendered post HTML using shiki.
  const highlighter = await getHighlighter({
    theme: 'one-dark-pro',
  });

  // Parse post content HTML with Cheerio.
  const $ = cheerio.load(post.content.rendered, {}, false);

  // Extract all code blocks to highlight them with shiki and then replace them in the post content.
  const codeBlocks = $('pre.wp-block-code');

  codeBlocks.each((index, codeBlock) => {
    // Extract the programming language to pass to the highlighter.
    const classAttributeValue = $(codeBlock).attr('class');
    const classes = classAttributeValue ? classAttributeValue.split(' ') : [];
    const language = classes.find((className) => className.startsWith('language-'))?.replace('language-', '');

    // Turn the code block content into a string, highlight it with shiki and then replace it in the post content.
    const codeBlockCode = $(codeBlock).find('code').text();
    const highlightedCode = highlighter.codeToHtml(codeBlockCode, { lang: language });
    $(codeBlock).find('code').html(highlightedCode);
  });

  // Save the post content with highlighted code blocks.
  const postContent = $.html();

  return (
    <>
      <article id="blog-post" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
        <Header post={post} />
        <Thumbnail image={thumbnail} priority={true} />
        <div className="post-body max-w-3xl mx-auto">
          <div className={styles.wordPressContent} dangerouslySetInnerHTML={{ __html: postContent }} />
        </div>
      </article>

      <PostShare text={post.title.rendered} link={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/${post.slug}`} />
    </>
  );
};

export default Post;
