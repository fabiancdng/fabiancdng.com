import { SbBlokData, storyblokEditable } from '@storyblok/react';

interface FeatureBlock extends SbBlokData {
  name: string;
}

const Feature = ({ blok }: { blok: FeatureBlock }) => (
  <div className="column feature" {...storyblokEditable(blok)}>
    {blok.name}
  </div>
);

export default Feature;
