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
  currentPageType: string;
  setCurrentPageType: (currentPageType: string) => void;
}

// Create the context.
export const GlobalsContext = createContext<globalsContext>({
  colorMode: 'light',
  setColorMode: () => {},
  currentPageType: '',
  setCurrentPageType: () => {},
});

/**
 * Provider for the GlobalsContext.
 */
export const GlobalsProvider = ({ children }: globalsProviderProps) => {
  const path = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [currentPageType, setCurrentPageType] = useState<string>('');

  useEffect(() => {
    /**
     * Return the current page type based on the current route.
     *
     * Get the most specific match.
     *
     * @returns The current page type.
     */
    const getCurrentPageType = () => {
      const pageTypes = {
        '/': 'home-page',
        '/blog': 'blog-overview',
        '/blog/categories/*': 'blog-category-page',
        '/authors/*': 'author-page',
        '/blog/*': 'blog-post-page',
        '/about': 'about-page',
        '/*': 'custom-page',
      };

      /**
       * Matches a given path against a set of page types and returns the most specific ones.
       *
       * @param path The Next.js path to match against.
       * @param navItems The object mapping paths to page types.
       * @returns The most specific match.
       */
      const matchPageType = (path: string, navItems: { [key: string]: string }): string => {
        for (let key in navItems) {
          let regex = new RegExp('^' + key.replace('*', '.*') + '$');
          if (regex.test(path)) {
            return navItems[key];
          }
        }
        return 'home'; //  Default value as fallback.
      };

      // Return the most specific match.
      return matchPageType(path, pageTypes);
    };

    const pageType = getCurrentPageType();
    console.log(pageType);
    setCurrentPageType(pageType);
  }, [path]);

  return (
    <GlobalsContext.Provider
      value={{
        colorMode,
        setColorMode,
        currentPageType,
        setCurrentPageType,
      }}>
      {children}
    </GlobalsContext.Provider>
  );
};
