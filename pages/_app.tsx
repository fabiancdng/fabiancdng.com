import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import 'highlight.js/styles/atom-one-dark.css';
import '../styles/ghost.css';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app overflow-x-hidden">
      {/* Progress bar when (re)loading page */}
      <NextNProgress
        options={{
          template:
            '<div class="bar" role="bar"><div class="peg"></div></div></div>',
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
