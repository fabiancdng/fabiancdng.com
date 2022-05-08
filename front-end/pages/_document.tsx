import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html className="min-h-screen" lang="en">
        <Head />
        <body className="dark:bg-slate-800 min-h-screen">
            <Main />
            <NextScript />
        </body>
    </Html>
  );
}

export default Document;