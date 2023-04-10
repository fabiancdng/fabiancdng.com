import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
  ISbStoryData,
} from '@storyblok/react';
import Head from 'next/head';

/**
 * Data for the Page Content Type from Storyblok.
 */
interface PageBlock extends SbBlokData {
  _uid: string;
  component: string;
  _editable: string;
  body: SbBlokData[];
}

interface PageProps {
  blok: PageBlock;
  story: ISbStoryData;
  relations: ISbStoryData[];
  payload: any;
}

/**
 * Page not wrapped in any container.
 * Makes sense if the page contains a lot of "high-level" components
 * like the home page.
 */
const UnwrappedPage = ({ blok, story, relations, payload }: PageProps) => {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body &&
        blok.body.map((nestedBlok) => (
          <StoryblokComponent
            blok={nestedBlok}
            story={story}
            relations={relations}
            payload={payload}
            key={nestedBlok._uid}
          />
        ))}
    </main>
  );
};

/**
 * Page wrapped in a container and a max-width.
 */
const WrappedPage = ({ blok, story, relations, payload }: PageProps) => {
  return (
    <main
      id="storyblok-page"
      className={story.slug !== 'home' ? 'page-or-post-css' : ''}
      {...storyblokEditable(blok)}>
      <article className="container pt-20 mx-auto mb-20 max-w-5xl text-black dark:text-white">
        {blok.body &&
          blok.body.map((nestedBlok) => (
            <StoryblokComponent
              blok={nestedBlok}
              story={story}
              relations={relations}
              payload={payload}
              key={nestedBlok._uid}
            />
          ))}
      </article>
    </main>
  );
};

/**
 * Component rendering out any page.
 */
const Page = ({ blok, story, relations, payload }: PageProps) => {
  // Array of page slugs that handle their own wrapping.
  const unwrappedPages = ['home', 'blog'];

  // Determine whether or not wrap page in pre-made container.
  if (unwrappedPages.includes(story.slug)) {
    return (
      <>
        <Head>
          <meta property="og:type" content="website" />
        </Head>

        <UnwrappedPage
          blok={blok}
          story={story}
          relations={relations}
          payload={payload}
        />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <meta property="og:type" content="website" />
        </Head>

        <WrappedPage
          blok={blok}
          story={story}
          relations={relations}
          payload={payload}
        />
      </>
    );
  }
};

export default Page;
