import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import {
  storyblokInit,
  apiPlugin,
  SbReactComponentsMap,
} from '@storyblok/react';
import 'highlight.js/styles/atom-one-dark.css';
import '../styles/page-or-post.css';
import '../styles/global.css';
import Page from '../components/Entities/Page';
import Grid from '../components/Misc/Grid';
import RichTextSection from '../components/Misc/RichTextSection';
import HeroSection from '../components/Homepage/HeroSection';
import ContactSection from '../components/Homepage/ContactSection';
import Post from '../components/Entities/Post';
import { SbBlogFeed } from '../components/Blog/Feed/BlogFeed';
import Project from '../components/Homepage/Projects/Project';
import Skills from '../components/Homepage/Skills/Skills';
import SkillChip from '../components/Homepage/Skills/SkillChip';

import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import TagFilter, { SbTagFilter } from '../components/Blog/Overview/TagFilter';
import BlogBanner from '../components/Blog/Overview/BlogBanner';
import Projects from '../components/Homepage/Projects/Projects';
import { GlobalsProvider } from '../context/Globals';

// Map Storyblok components to Next.js components.
const storyblokComponentsMapping: SbReactComponentsMap = {
  // Versatile.
  grid: Grid,
  richTextSection: RichTextSection,

  // Content types.
  page: Page,
  post: Post,

  // Homepage / Portfolio.
  heroSection: HeroSection,
  contactSection: ContactSection,
  project: Project,
  projects: Projects,
  skills: Skills,
  skillChip: SkillChip,

  // Blog.
  blogBanner: BlogBanner,
  blogFeed: SbBlogFeed,
  blogTagFilter: SbTagFilter,
};

// Initialize Storyblok.
storyblokInit({
  accessToken: process.env['NEXT_PUBLIC_STORYBLOK_TOKEN'],
  use: [apiPlugin],
  components: storyblokComponentsMapping,
  apiOptions: {
    cache: {
      clear: 'auto',
      type: 'none',
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalsProvider>
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
    </GlobalsProvider>
  );
}

export default App;
