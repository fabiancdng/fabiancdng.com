'use client';

import { createContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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
  const path = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [activeNavItem, setActiveNavItem] = useState<string>('');

  useEffect(() => {
    // Set active nav item state based on the current route (/ parts of it).
    if (path === '/') {
      // On homepage (including contact-me section).
      setActiveNavItem('home');
    } else if (path === '/about') {
      // Custom about page.
      setActiveNavItem('about');
    } else if (path.includes('#projects')) {
      // On homepage in the projects section.
      setActiveNavItem('projects');
    } else if (path === '/blog') {
      // Blog overview page.
      setActiveNavItem('blog');
    } else if (path.includes('/blog')) {
      // On any page matching /blog*.
      setActiveNavItem('blog-single');
    } else {
      // Not on any page matching a navlink. Clear state.
      setActiveNavItem('');
    }
  }, [path]);

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
