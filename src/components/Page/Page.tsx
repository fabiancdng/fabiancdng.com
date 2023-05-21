import { Page } from '@/types';
import Markdown from '../Markdown/Markdown';

const Page = ({ page }: { page: Page }) => {
  return (
    <article id="page" className="container pt-32 px-7 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      <div className="post-body max-w-3xl mx-auto">
        <Markdown slug={page.slug} content={page.content} />
      </div>
    </article>
  );
};

export default Page;
