import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html className="min-h-screen" lang="en">
        <Head />
        <body className="dark:bg-slate min-h-screen">
          <div className="dark:bg-slate-900 dark:text-white">
            <Main />
            <NextScript />
          </div>
        </body>
    </Html>
  );
}

export default Document;