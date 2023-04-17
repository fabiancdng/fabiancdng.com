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
  const [activeNavItem, setActiveNavItem] = useState<string>(router.asPath);

  useEffect(() => {
    setActiveNavItem(router.asPath);
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
