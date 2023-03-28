import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from '@storyblok/react';

interface PageBlock extends SbBlokData {
  body: SbBlokData[];
}

const Page = ({ blok }: { blok: PageBlock }) => (
  <main className="text-center mt-4" {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;
