import { Html, Head, Main, NextScript } from 'next/document';
import { env } from 'process';

const Document = () => {
  return (
    <Html className="min-h-screen" lang="en">
      <Head>
        {env.NODE_ENV === 'production' && (
          <script
            defer
            data-domain="fabiancdng.com"
            src="https://analytics.fabiancdng.com/js/plausible.js"></script>
        )}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <div className="dark:bg-slate-900 min-h-screen dark:text-white relative">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
};

export default Document;
