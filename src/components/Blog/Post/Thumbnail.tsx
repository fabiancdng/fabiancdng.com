import { getImageDimensions, getImagePath, getImageSource } from '@/adapters/ImageAdapter';
import Image from 'next/image';

const Thumbnail = ({ title, slug, priority }: { title: string; slug: string; priority: boolean }) => {
  const thumbnailPath = getImagePath(`/blog/${slug}`, 'thumbnail.jpg');
  const thumbnailSource = getImageSource(`/blog/${slug}`, 'thumbnail.jpg');
  const thumbnailDimensions = getImageDimensions(thumbnailPath);

  return (
    <div className="w-full px-0 sm:px-7 h-full">
      <Image
        src={thumbnailSource}
        alt={title}
        priority={priority}
        className="lg:w-11/12 w-full mx-auto my-16 rounded-lg"
        width={thumbnailDimensions.width}
        height={thumbnailDimensions.height}
      />
    </div>
  );
};

export default Thumbnail;
