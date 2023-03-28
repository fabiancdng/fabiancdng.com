import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import 'highlight.js/styles/atom-one-dark.css';
import '../styles/ghost.css';
import '../styles/global.css';
import Page from '../components/Storyblok/Page';
import Teaser from '../components/Storyblok/Teaser';
import Grid from '../components/Storyblok/Grid';
import Feature from '../components/Storyblok/Feature';
import HeroSection from '../components/Misc/HeroSection';

// Map Storyblok components to Next.js components.
const storyblokComponents = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero: HeroSection,
};

storyblokInit({
  accessToken: process.env['STORYBLOK_TOKEN'],
  use: [apiPlugin],
  components: storyblokComponents,
});

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
