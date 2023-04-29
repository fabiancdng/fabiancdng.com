import React, { useContext } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { GlobalsContext } from '../../context/Globals';

const Layout = ({ children }: { children: JSX.Element }) => {
  // Get global website values for active nav item.
  const globals = useContext(GlobalsContext);

  return (
    <>
      <Navbar
        links={[
          {
            title: 'Home',
            href: '/',
            active: globals.activeNavItem === 'home',
          },
          {
            title: 'Projects',
            href: '/#projects',
            active: globals.activeNavItem === 'projects',
          },
          {
            title: 'Blog',
            href: '/blog',
            active: globals.activeNavItem === 'blog',
          },
          {
            title: 'About',
            href: '/about',
            active: globals.activeNavItem === 'about',
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
