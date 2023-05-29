/**
 * Props for the PostShareButton component.
 */
interface PostShareButtonProps {
  label: string;
  href: string;
  icon: string;
}

/**
 * Component for a single social media share button.
 */
const PostShareButton = ({ label, href, icon }: PostShareButtonProps) => {
  return (
    <a
      href={href}
      type="button"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 flex justify-center items-center rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600
                  transition-all ease-in-out`}>
      <i className={`${icon} text-xl`}></i>
    </a>
  );
};

/**
 * Section to share the blog post on social media.
 */
const PostShare = ({ link, text }: { link: string; text: string }) => {
  return (
    <div id="blog-post-share" className="flex flex-row max-w-3xl justify-evenly mt-20 mx-auto">
      <PostShareButton label="Share on Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} icon="fab fa-facebook-f" />

      <PostShareButton label="Share on Twitter" href={`https://twitter.com/intent/tweet?text=${text}&url=${link}`} icon="fab fa-twitter" />

      <PostShareButton
        label="Share on Reddit"
        href={`https://www.reddit.com/submit?url=${link}&title=${text}`}
        icon="fab fa-reddit-alien"
      />

      <PostShareButton
        label="Share on LinkedIn"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`}
        icon="fab fa-linkedin"
      />
    </div>
  );
};

export default PostShare;
