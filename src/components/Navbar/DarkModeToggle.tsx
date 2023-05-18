import { useContext, useEffect, useState } from 'react';
import { GlobalsContext } from '@/context/Globals';

/**
 * Props for the DarkModeToggle component.
 */
interface DarkModeToggleProps {
  additionalCSS?: string;
}

const DarkModeToggle = ({ additionalCSS }: DarkModeToggleProps) => {
  // Get color mode state from global context.
  const { colorMode, setColorMode } = useContext(GlobalsContext);

  const changeColorMode = () => {
    // The new color mode to apply.
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';

    // Save color mode in localStorage.
    window.localStorage.setItem('colorMode', newColorMode);

    // Toggle color mode in state.
    setColorMode(newColorMode);
  };

  useEffect(() => {
    // Set initial color mode according to user's preferences (if set).
    const storedColorMode = window.localStorage.getItem('colorMode') === 'dark' ? 'dark' : 'light';
    if (storedColorMode !== null) {
      setColorMode(storedColorMode);
    }
    // Disable exhaustive-deps warning because setter is not needed in dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set .dark class on body to use tailwind dark: selectors.
    if (colorMode === 'dark') {
      document.body.classList.add('dark');
    } else {
      // Remove class when dark mode has been disabled.
      document.body.classList.remove('dark');
    }
  }, [colorMode]);

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={changeColorMode}
      className={
        `hover:bg-slate-200 bg-slate-100 flex flex-col justify-center items-center rounded cursor-pointer px-4 py-2
            text-xl transition-all duration-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white
            border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200 ` + additionalCSS
      }>
      {colorMode === 'light' ? <i className="text-2xl fas fa-moon" /> : <i className="text-2xl far fa-moon" />}
    </button>
  );
};

export default DarkModeToggle;
