import Link from 'next/link';
import MarkdownIt from 'markdown-it';

/**
 * Props for the RichTextSection component.
 */
interface richTextSectionProps {
  title: string;
  subtitle: string | null;
  htmlAnchor: string | null;
  content: string | null;
  readMoreLink: string | null;
}

const RichTextSection = (props: richTextSectionProps) => {
  // MarkdownIt object to convert RichtText (markdown) to HTML.
  const markdownIt = new MarkdownIt();

  return (
    <div
      id={props.htmlAnchor !== null ? props.htmlAnchor : ''}
      className="w-screen dark:bg-slate-900">
      {/* Wrapper */}
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-20 text-center sm:text-left mx-4 sm:mx-0">
          {props.title}
        </h1>

        {/* Subtitle */}
        {props.subtitle !== null && (
          <h2 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">
            {props.subtitle}
          </h2>
        )}

        {/* Content */}
        <div className="mx-auto mt-5 sm:w-full w-4/5">
          {props.content !== null && (
            <div
              className="text-xl leading-10 text-center sm:text-left"
              dangerouslySetInnerHTML={{
                // Render the markdown content as HTML.
                __html: markdownIt.render(props.content),
              }}
            />
          )}
        </div>

        {/* Read more link */}
        {props.readMoreLink !== null && (
          <div className="mt-5 flex flex-row sm:justify-start justify-center">
            <Link href={props.readMoreLink}>
              <a
                className={`hover:bg-slate-200 bg-slate-100 rounded cursor-pointer px-10 py-3
                    text-md transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
                    border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-300`}>
                <b className="font-medium">Read more &rarr;</b>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextSection;
