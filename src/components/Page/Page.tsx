import { WP_Post } from '@/types';
import styles from './Page.module.css';

const Page = ({ page }: { page: WP_Post }) => {
  return (
    <article id="page" className="container pt-32 px-7 mx-auto mb-20 max-w-3xl text-black dark:text-white">
      <h1 className="text-5xl font-bold">{page.title.rendered}</h1>
      <div className={styles.wordPressContent} dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
    </article>
  );
};

export default Page;
