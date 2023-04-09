import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar
        links={[
          { title: 'Home', href: '/', active: true },
          { title: 'Projects', href: '/#projects', active: false },
          { title: 'Blog', href: '/blog/posts', active: false },
          { title: 'About', href: '/about', active: false },
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
