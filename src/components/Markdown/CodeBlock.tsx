import { getHighlighter } from 'shiki';

const CodeBlock = async ({ code, language }: { code: string; language: string }) => {
  const shikiHighlighter = await getHighlighter({
    theme: 'one-dark-pro',
  });

  const codeHighlighted = shikiHighlighter.codeToHtml(code, { lang: language });

  return <div className="code-block" dangerouslySetInnerHTML={{ __html: codeHighlighted }} />;
};

export default CodeBlock;
