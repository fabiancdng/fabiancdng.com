import { storyblokEditable } from '@storyblok/react';

const Teaser = ({ blok }: any) => {
  return (
    <h2 className="text-2xl mb-10" {...storyblokEditable(blok)}>
      {blok.headline}
    </h2>
  );
};

export default Teaser;
