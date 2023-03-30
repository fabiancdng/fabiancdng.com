import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from '@storyblok/react';

interface GridBlock extends SbBlokData {
  columns: SbBlokData[];
}

const Grid = ({ blok }: { blok: GridBlock }) => {
  return (
    <div className="grid grid-cols-3" {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
