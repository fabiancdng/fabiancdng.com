import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CodeBlock from './CodeBlock';
import Image from 'next/image';
import { getImage } from '@/adapters/ImageAdapter';
import Link from 'next/link';

import styles from './Markdown.module.css';

/**
 * Markdown content to be rendered.
 */
const Markdown = ({ slug, content }: { slug: string; content: string }) => {
  /**
   * Custom <code> block renderer.
   */
  const renderNodeCode: CodeComponent = ({ node, inline, className, children, ...props }) => {
    // Code to render and highlight in the code block.
    const code = String(children).replace(/\n$/, '');

    // Programming language of the snippet.
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'text';

    return !inline && match ? (
      /* @ts-expect-error Server Component */
      <CodeBlock code={code} language={language} />
    ) : (
      <code {...props} className={`${className || ''} bg-gray-100 text-red-600 dark:text-red-400 p-1 dark:bg-slate-800`}>
        {children}
      </code>
    );
  };

  /**
   * Custom <pre> tag renderer.
   * Removes surrounding <pre> tag, if <pre> tag contains only one <code> tag.
   */
  const renderNodePre = ({ children }: { children: JSX.Element[] }): JSX.Element => {
    if (children.length === 1 && children[0].type === 'code') {
      return children[0];
    }

    return <pre>{children}</pre>;
  };

  /**
   * Custom <img> renderer.
   * Makes use of Next.js image optimization.
   */
  const renderNodeImage = ({ node, src, alt }: any) => {
    const image = getImage(`/blog/${slug}`, src.split('/').pop()!);

    return <Image src={image.source} title={alt} alt={alt} width={image.dimensions.width} height={image.dimensions.height} />;
  };

  // Map of nodes and their custom render function.
  const renderMap: any = {
    code: renderNodeCode,
    pre: renderNodePre,
    img: renderNodeImage,
    hr: () => <hr className="w-full border-gray-300 dark:border-slate-600 my-10" />,
    a: ({ children, href }: { children: JSX.Element[]; href: string }) => (
      <Link href={href} target="_blank">
        {children}
      </Link>
    ),
    blockquote: ({ children }: { children: JSX.Element[] }) => (
      <blockquote className="px-5 py-1 my-5 rounded-md border-l-4 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-slate-800">
        {children}
      </blockquote>
    ),
  };

  return <ReactMarkdown className={styles.markdownContent} children={content} components={renderMap} />;
};

export default Markdown;
