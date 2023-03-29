import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
  ISbStoryData,
} from '@storyblok/react';

/**
 * Data for the Page Content Type from Storyblok.
 */
interface PageBlock extends SbBlokData {
  body: SbBlokData[];
}

const Page = ({ blok, story }: { blok: PageBlock; story: ISbStoryData }) => (
  <main
    id="storyblok-page"
    className="page-or-post-css"
    {...storyblokEditable(blok)}>
    <div className="container pt-20 mx-auto mb-20 max-w-5xl text-black dark:text-white">
      {blok.body &&
        blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
  </main>
);

export default Page;
