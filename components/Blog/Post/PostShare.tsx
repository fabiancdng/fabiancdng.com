const PostShareButton = ({ href, icon }: { href: string; icon: string }) => {
  return (
    <a
      href={href}
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
    <div
      id="blog-post-share"
      className="flex flex-row max-w-3xl justify-evenly mt-20 mx-auto">
      <PostShareButton
        href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
        icon="fab fa-facebook-f"
      />

      <PostShareButton
        href={`https://twitter.com/intent/tweet?text=${text}&url=${link}`}
        icon="fab fa-twitter"
      />

      <PostShareButton
        href={`https://www.reddit.com/submit?url=${link}&title=${text}`}
        icon="fab fa-reddit-alien"
      />

      <PostShareButton
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`}
        icon="fab fa-linkedin"
      />
    </div>
  );
};

export default PostShare;
