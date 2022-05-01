import type { AppProps } from 'next/app';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  return (
    // <GlobalContextProvider>
    <div className="app overflow-x-hidden">
      <Component {...pageProps} />
    </div>
    // </GlobalContextProvider>
  );
}

export default App;
