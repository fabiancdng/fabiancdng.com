import { WP_Embedded_Media } from '@/types';
import Image from 'next/image';

const Thumbnail = ({ image, priority }: { image: WP_Embedded_Media; priority: boolean }) => {
  return (
    <div className="w-full px-0 sm:px-7 h-full">
      <Image
        src={image.source_url}
        alt={image.alt_text}
        priority={priority}
        className="lg:w-11/12 w-full mx-auto my-16 rounded-lg"
        width={image.media_details.width}
        height={image.media_details.height}
      />
    </div>
  );
};

export default Thumbnail;
