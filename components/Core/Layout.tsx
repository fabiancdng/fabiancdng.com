import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  return (
    <>
      <Navbar
        links={[
          {
            title: 'Home',
            href: '/',
            active: router.asPath === '/',
          },
          {
            title: 'Projects',
            href: '/#projects',
            active: router.asPath.startsWith('/#projects'),
          },
          {
            title: 'Blog',
            href: '/blog',
            active: router.asPath.startsWith('/blog'),
          },
          {
            title: 'About',
            href: '/about',
            active: router.asPath.startsWith('/about'),
          },
        ]}
      />

      {children}

      <Footer
        text={`Copyright © 2021-${new Date().getFullYear()} Fabian Reinders`}
        links={[
          { title: 'Contact', href: '/#contact-me' },
          { title: 'Legal Notice', href: '/legal-notice' },
          { title: 'Privacy Policy', href: '/privacy-policy' },
        ]}
      />
    </>
  );
};

export default Layout;
