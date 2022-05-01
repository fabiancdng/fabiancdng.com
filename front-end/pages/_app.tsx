import type { AppProps } from 'next/app';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  return (
    // <GlobalContextProvider>
      <Component {...pageProps} />
    // </GlobalContextProvider>
  );
}

export default App;
