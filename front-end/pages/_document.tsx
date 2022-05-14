import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html className="min-h-screen" lang="en">
        <Head />
        <body>
          <div className="dark:bg-slate-900 min-h-screen dark:text-white relative">
            <Main />
            <NextScript />
          </div>
        </body>
    </Html>
  );
}

export default Document;