import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header/Header';
import HeroSection from '../components/Misc/HeroSection';

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

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export default Home;
