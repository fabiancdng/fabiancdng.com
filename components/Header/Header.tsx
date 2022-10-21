import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';
import HeaderLink from './HeaderLink';
import Link from 'next/link';

/**
 * Data for a specific header link.
 */
interface headerLink {
  title: string;
  href: string;
  active: boolean;
}

/**
 * Data passed as props to the Header component.
 */
interface headerProps {
  links: headerLink[];
}

const Header = ({ links }: headerProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // The width (in px) when the mobile nav is used instead.
  const menuBreakpoint = 640;

  useEffect(() => {
    const handleResize = () => {
      // Update screenWidth state on resize.
      setScreenWidth(window.innerWidth);
      // Auto-toggle mobile menu when not in use anymore.
      if (screenWidth < menuBreakpoint) setMobileMenuOpen(false);
    };

    // Event listener for keeping screenWidth up-to-date.
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-white dark:bg-slate-800">
      {/* Navigation */}
      <nav className="flex items-center px-2 sm:px-0 my-1 container mx-auto">
        {/* Site title/logo */}
        <div className="w-14 h-14 p-1 flex items-center">
          <Link href="/">
            <img className="cursor-pointer" src="/header-image.png" alt="" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden left-0 sm:flex flex-1 justify-end items-center gap-5 text mr-7 uppercase text-md">
          {
            // Render all header links (separate `HeaderLink` component).
            links.map((link, index) => (
              // Single Navigation Link
              <li key={index}>
                <HeaderLink
                  title={link.title}
                  href={link.href}
                  additionalCSS="dark:hover:bg-slate-600 dark:text-white hover:bg-slate-200 rounded transition-all duration-500 px-4 py-2"
                />
              </li>
            ))
          }
        </ul>

        {/* Icon to toggle dark/light mode */}
        <div className="hidden sm:flex">
          <DarkModeToggle additionalCSS="" />
        </div>

        {/* Mobile menu toggler (icon) */}
        <div className="flex sm:hidden space-x-4 flex-1 justify-end text-3xl">
          {/* Icon to toggle dark/light mode */}
          <DarkModeToggle additionalCSS="" />
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded p-2 transition-all
                        ease-in-out duration-200 hover:bg-slate-200 bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white
                        border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200`}>
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <ul className="p-4 mt-2 block space-y-3 md:hidden bg-slate-100 dark:bg-slate-700">
          {
            // Render all header links (separate `HeaderLink` component).
            links.map((link, index) => (
              // Single Navigation Link
              <li
                key={index}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded bg-slate-200 hover:bg-slate-300 transition
                            ease-in-out duration-300 dark:bg-slate-600 dark:hover:bg-slate-500">
                <HeaderLink
                  title={link.title}
                  href={link.href}
                  additionalCSS="block w-full px-3 py-2"
                />
              </li>
            ))
          }
        </ul>
      )}
    </header>
  );
};

export default Header;
