import Image from 'next/image';

const Thumbnail = ({ slug }: { slug: string }) => {
  return (
    <div className="w-full px-0 sm:px-7 h-full">
      <Image
        src={`/api/content/images/blog/${slug}/img/thumbnail.jpg?token=${process.env.NEXT_PUBLIC_CONTENT_IMAGE_API_KEY}`}
        alt="Thumbnail of the blog post"
        className="lg:w-11/12 w-full mx-auto my-16 rounded-lg"
        width="871"
        height="489"
      />
    </div>
  );
};

export default Thumbnail;
