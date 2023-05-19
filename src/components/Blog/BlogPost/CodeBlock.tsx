import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

/**
 * Multi-line code block to render and highlight.
 */
const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  return <SyntaxHighlighter children={code} style={atomDark} language={language} />;
};

export default CodeBlock;
