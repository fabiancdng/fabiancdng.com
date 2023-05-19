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
 * Renders <pre> tag.
 * Removes surrounding <pre> tag, if <pre> tag contains only one <code> tag.
 */
const renderNodePre = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  if (children.length === 1 && children[0].type === 'code') {
    return children[0];
  }

  return <pre>{children}</pre>;
};

/**
 * Markdown content to be rendered.
 */
const Markdown = ({ content }: { content: string }) => {
  // Map of nodes and their custom render function.
  const renderMap: any = {
    code: renderNodeCode,
    pre: renderNodePre,
  };

  return <ReactMarkdown children={content} components={renderMap} />;
};

export default Markdown;
