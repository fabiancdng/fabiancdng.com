import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header/Header';

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

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export default Home;
