import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header
        links={[
          { title: 'Home', href: '/', active: true },
          { title: 'Projects', href: '/#projects', active: false },
          { title: 'Blog', href: '/blog', active: false },
          { title: 'About', href: '/about', active: false },
        ]}
      />

      {children}

      <Footer
        text="Copyright &copy; 2022 Fabian Reinders"
        links={[
          { title: 'Contact', href: '/#contact-me' },
          { title: 'Imprint', href: '/imprint' },
          { title: 'Privacy Policy', href: '/privacy-policy' },
        ]}
      />
    </>
  );
};

export default Layout;
