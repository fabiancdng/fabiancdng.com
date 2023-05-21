import { Metadata } from 'next';
import { GlobalsProvider } from '@/context/Globals';
import { openGraphBaseMetadata, twitterBaseMetadata } from '@/app/metadata';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import './globals.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';

/**
 * Global and default metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://fabiancdng.com'),
  title: 'fabiancdng.com',
  description:
    "I'm Fabian Reinders, a student and full-stack web developer. On this website, I introduce myself, my projects, and my skills and write blog posts.",
  keywords: ['full stack', 'web developer', 'web development', 'developer', 'blog', 'portfolio'],
  twitter: twitterBaseMetadata,
  openGraph: openGraphBaseMetadata,
};

/**
 * Base layout for composition of pages.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app overflow-x-hidden dark:bg-slate-900 min-h-screen dark:text-white">
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

            {children}

            <Footer
              text={`Copyright © 2021-${new Date().getFullYear()} Fabian Reinders`}
              links={[
                { title: 'Contact', href: '/#contact-me' },
                { title: 'Legal Notice', href: '/legal-notice' },
                { title: 'Privacy Policy', href: '/privacy-policy' },
              ]}
            />
          </GlobalsProvider>
        </div>
      </body>
    </html>
  );
}
