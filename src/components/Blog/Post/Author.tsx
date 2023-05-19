const Author = () => {
  return (
    <div className="post-author w-fit">
      <a className="w-fit" href="/authors/fabiancdng">
        <div className="flex items-center my-8">
          <img
            alt="Fabian Reinders's profile picture"
            className="w-12 h-12 mr-2 rounded-full"
            src="/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fa.storyblok.com%2Ff%2F213297%2F962x901%2Fe636e7c9eb%2Fpb.JPG&amp;w=128&amp;q=75"
          />

          <div className="block">
            <p className="text-lg font-medium leading-3 mb-1">Fabian Reinders</p>
            <p className="text-gray-600 text-md dark:text-slate-400">April 8, 2023</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Author;
