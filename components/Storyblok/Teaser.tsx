import { SbBlokData, storyblokEditable } from '@storyblok/react';

interface TeaserBlock extends SbBlokData {
  headline: string;
}

const Teaser = ({ blok }: { blok: TeaserBlock }) => {
  return (
    <h2 className="text-2xl mb-10" {...storyblokEditable(blok)}>
      {blok.headline}
    </h2>
  );
};

export default Teaser;
