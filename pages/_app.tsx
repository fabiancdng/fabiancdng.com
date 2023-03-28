import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import {
  storyblokInit,
  apiPlugin,
  SbReactComponentsMap,
} from '@storyblok/react';
import 'highlight.js/styles/atom-one-dark.css';
import '../styles/ghost.css';
import '../styles/global.css';
import Page from '../components/Storyblok/Page';
import Grid from '../components/Storyblok/Grid';
import RichTextSection from '../components/Misc/RichTextSection';
import HeroSection from '../components/Misc/HeroSection';
import ContactSection from '../components/Misc/ContactSection';

// Map Storyblok components to Next.js components.
const storyblokComponentsMapping: SbReactComponentsMap = {
  grid: Grid,
  page: Page,
  heroSection: HeroSection,
  richTextSection: RichTextSection,
  contactSection: ContactSection,
};

// Initialize Storyblok.
storyblokInit({
  accessToken: process.env['STORYBLOK_TOKEN'],
  use: [apiPlugin],
  components: storyblokComponentsMapping,
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
