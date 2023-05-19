import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CodeBlock from './CodeBlock';

/**
 * Custom code block renderer.
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
    <code {...props} className={className}>
      {children}
    </code>
  );
};

/**
 * Markdown content to be rendered.
 */
const Markdown = ({ content }: { content: string }) => {
  // Map of nodes and their custom render function.
  const renderMap = {
    code: renderNodeCode,
  };

  return <ReactMarkdown children={content} components={renderMap} />;
};

export default Markdown;
