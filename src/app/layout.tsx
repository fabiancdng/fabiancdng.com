import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import './globals.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import { GlobalsProvider } from '@/context/Globals';

/**
 * Global and default metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://fabiancdng.com'),
  alternates: {
    canonical: new URL(process.env.NEXT_PUBLIC_URL || 'https://fabiancdng.com'),
  },
  title: 'fabiancdng.com',
  description:
    "I'm Fabian Reinders, a student and full-stack web developer. On this website, I introduce myself, my projects, and my skills and write blog posts.",
  authors: [{ name: 'Fabian Reinders', url: 'https://fabiancdng.com' }],
  keywords: ['full stack', 'web developer', 'web development', 'developer', 'blog', 'portfolio'],
  twitter: {
    card: 'summary',
    site: '@fabiancdng',
    images: [
      {
        url: '/img/logo.png',
        width: 232,
        height: 232,
        alt: 'fabiancdng.com Logo',
      },
    ],
  },

  openGraph: {
    type: 'website',
    siteName: process.env.NEXT_PUBLIC_SITENAME || 'fabiancdng.com',
    images: [
      {
        url: '/img/logo.png',
        width: 232,
        height: 232,
        alt: 'fabiancdng.com Logo',
      },
    ],
  },
};

/**
 * Base layout for composition of pages.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalsProvider>
          <Navbar
            links={[
              {
                title: 'Home',
                name: 'home',
                href: '/',
              },
              {
                title: 'Projects',
                name: 'projects',
                href: '/#projects',
              },
              {
                title: 'Blog',
                name: 'blog',
                href: '/blog',
              },
              {
                title: 'About',
                name: 'about',
                href: '/about',
              },
            ]}
          />

          <main className="app overflow-x-hidden dark:bg-slate-900 min-h-screen dark:text-white">{children}</main>

          <Footer
            text={`Copyright © 2021-${new Date().getFullYear()} Fabian Reinders`}
            links={[
              { title: 'Contact', href: '/#contact-me' },
              { title: 'Legal Notice', href: '/legal-notice' },
              { title: 'Privacy Policy', href: '/privacy-policy' },
            ]}
          />
        </GlobalsProvider>
      </body>
    </html>
  );
}
