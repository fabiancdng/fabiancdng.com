import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header/Header';
import HeroSection from '../components/Misc/HeroSection';
import ProjectExplorer from '../components/Projects/ProjectExplorer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Homepage | fabiancdng.com</title>
        <meta
          name="description"
          content={`Hey 👋 I'm Fabian, a student and full-stack web-developer. On this website, you can find some of my current projects and my blog posts about development and tech.`}
        />
      </Head>

      <Header
        links={[
          { title: 'Home', href: '/', active: true },
          { title: 'Projects', href: '/#projects', active: false },
          { title: 'Blog', href: '/blog', active: false },
          { title: 'About', href: '/about', active: false },
        ]}
      />

      <HeroSection
        title="Hey 👋"
        subtitle="I'm Fabian"
        description="Student & full-stack web developer"
        logoURL="/logo-circle-upscaled.png"
        htmlAnchor="home"
        socialButtons={[
          {
            title: 'Email',
            href: 'mailto:contact@fabiancdng.com?subject=Inquiry regarding &body=%0D%0A%0D%0Avia fabiancdng.com',
            icon: 'FaEnvelope',
          },
          {
            title: 'Twitter',
            href: 'https://twitter.com/fabiancdng',
            icon: 'BsTwitter',
          },
          {
            title: 'GitHub',
            href: 'https://github.com/fabiancdng',
            icon: 'FaGithub',
          },
          {
            title: 'Spotify',
            href: 'https://open.spotify.com/user/kws4b4itjpu3avjbm67ysxnhj',
            icon: 'BsSpotify',
          },
          {
            title: 'Discord',
            href: 'https://discord.com/users/395613173497069569',
            icon: 'BsDiscord',
          },
        ]}
      />

      <ProjectExplorer
        title="Projects"
        subtitle="Here are some of my current projects"
        htmlAnchor="projects"
        projects={[
          {
            name: 'GoShortrr',
            slug: 'goshortrr',
            href: 'https://github.com/fabiancdng/GoShortrr',
            githubRepo: 'fabiancdng/GoShortrr',
            shortDescription:
              '🔗  A fast, simple and powerful URL-Shortener built with Go and React.',
            longDescription: '',
            languages: [
              {
                name: 'Go',
                homepage: 'https://go.dev/',
                colorCode: '#79d4fd',
              },
              {
                name: 'JavaScript',
                homepage:
                  'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                colorCode: '#ead31d',
              },
            ],
          },
          {
            name: 'BeeLogger',
            slug: 'beelogger',
            href: 'https://github.com/Programmier-AG/BeeLogger',
            githubRepo: 'Programmier-AG/BeeLogger',
            shortDescription:
              '🐝 A software for beekeepers that provides scripts for recording data (such as weight or temperature), a powerful REST API for processing it and a dashboard for viewing it.',
            longDescription: '',
            languages: [
              {
                name: 'Python',
                homepage: 'https://www.python.org/',
                colorCode: '#3572a5',
              },
            ],
          },
          {
            name: 'fabiancdng.com',
            slug: 'fabiancdng-com',
            href: 'https://github.com/fabiancdng/fabiancdng.com',
            githubRepo: 'fabiancdng/fabiancdng.com',
            shortDescription:
              '🌐 My personal website and blog built with React, Next.js and Tailwind.',
            longDescription: '',
            languages: [
              {
                name: 'TypeScript',
                homepage: 'https://www.typescriptlang.org/',
                colorCode: '#2b7489',
              },
            ],
          },
        ]}
      />

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export default Home;
