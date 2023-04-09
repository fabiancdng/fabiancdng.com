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
import Page from '../components/Core/Page';
import Grid from '../components/Storyblok/Grid';
import RichTextSection from '../components/Misc/RichTextSection';
import HeroSection from '../components/Misc/HeroSection';
import ContactSection from '../components/Misc/ContactSection';
import Post from '../components/Core/Post';
import BlogPosts from '../components/BlogPosts/BlogPosts';
import Project from '../components/Misc/Project';
import Skills from '../components/Misc/Skills/Skills';
import SkillChip from '../components/Misc/Skills/SkillChip';

import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import TagFilter from '../components/BlogPosts/TagFilter';

// Map Storyblok components to Next.js components.
const storyblokComponentsMapping: SbReactComponentsMap = {
  grid: Grid,
  page: Page,
  post: Post,
  heroSection: HeroSection,
  richTextSection: RichTextSection,
  contactSection: ContactSection,
  blogPosts: BlogPosts,
  project: Project,
  skills: Skills,
  skillChip: SkillChip,
  blogTagFilter: TagFilter,
};

// Initialize Storyblok.
storyblokInit({
  accessToken: process.env['NEXT_PUBLIC_STORYBLOK_TOKEN'],
  use: [apiPlugin],
  components: storyblokComponentsMapping,
  apiOptions: {
    cache: {
      clear: process.env.NODE_ENV === 'production' ? 'auto' : 'manual',
      type: 'memory',
    },
  },
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
