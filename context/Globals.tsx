import { Router, useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

/**
 * Data passed as props to the GlobalsProvider component.
 */
interface globalsProviderProps {
  children: React.ReactNode;
}

/**
 * Data passed as props to the GlobalsContext component.
 */
interface globalsContext {
  colorMode: 'light' | 'dark';
  setColorMode: (colorMode: 'light' | 'dark') => void;
  activeNavItem: string;
  setActiveNavItem: (activeNavItem: string) => void;
}

// Create the context.
export const GlobalsContext = createContext<globalsContext>({
  colorMode: 'light',
  setColorMode: () => {},
  activeNavItem: '',
  setActiveNavItem: () => {},
});

/**
 * Provider for the GlobalsContext.
 */
export const GlobalsProvider = ({ children }: globalsProviderProps) => {
  const router = useRouter();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [activeNavItem, setActiveNavItem] = useState<string>('');

  useEffect(() => {
    // Set active nav item state based on the current route (/ parts of it).
    if (router.asPath === '/' || router.asPath.includes('#contact-me')) {
      // On homepage (including contact-me section).
      setActiveNavItem('home');
    } else if (router.asPath === '/about') {
      // Custom about page.
      setActiveNavItem('about');
    } else if (router.asPath.includes('#projects')) {
      // On homepage in the projects section.
      setActiveNavItem('projects');
    } else if (router.asPath.includes('/blog')) {
      // On any page matching /blog*.
      setActiveNavItem('blog');
    } else {
      // Not on any page matching a navlink. Clear state.
      setActiveNavItem('');
    }
  }, [router.asPath]);

  return (
    <GlobalsContext.Provider
      value={{
        colorMode,
        setColorMode,
        activeNavItem,
        setActiveNavItem,
      }}>
      {children}
    </GlobalsContext.Provider>
  );
};
