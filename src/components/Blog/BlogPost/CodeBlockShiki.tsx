import React from 'react';
import { getHighlighter } from 'shiki';

const CodeBlockShiki = async ({ code, language }: { code: string; language: string }) => {
  const shikiHighlighter = await getHighlighter({
    theme: 'one-dark-pro',
  });

  const codeHighlighted = shikiHighlighter.codeToHtml(code, { lang: language });

  return <div dangerouslySetInnerHTML={{ __html: codeHighlighted }} />;
};

export default CodeBlockShiki;
