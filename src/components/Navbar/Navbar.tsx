'use client';

import { useContext, useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Link from 'next/link';
import Image from 'next/image';
import NavbarImage from '../../../public/img/navbar-image.png';
import { GlobalsContext } from '@/context/Globals';

/**
 * Data for a specific navbar link.
 */
interface NavigationLink {
  title: string;
  name: string;
  href: string;
}

/**
 * Data passed as props to the Navbar component.
 */
interface NavbarProps {
  links: NavigationLink[];
}

const Navbar = ({ links }: NavbarProps) => {
  // Get active nav item from globals context.
  const { activeNavItem } = useContext(GlobalsContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // The width (in px) when the mobile nav is used instead.
  const menuBreakpoint = 640;

  // State representing if at the top/very beginning of the page or not.
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Update screenWidth state on resize.
      setScreenWidth(window.innerWidth);
      // Auto-toggle mobile menu when not in use anymore.
      if (screenWidth < menuBreakpoint) setMobileMenuOpen(false);
    };

    // Event listener for keeping screenWidth up-to-date.
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      setAtTop(document.documentElement.scrollTop === 0);
    };

    // Event listener for keeping atTop up-to-date.
    window.addEventListener('scroll', handleScroll);
  }, [screenWidth]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-20 bg-white dark:bg-slate-800 border-slate-500
                      ${atTop ? '' : 'drop-shadow-md'} transition-all ease-in-out duration-500`}>
      {/* Navigation */}
      <nav className="flex items-center my-1 px-6 mx-auto">
        {/* Site title/logo */}
        <div className="w-14 h-14 p-1 flex items-center">
          <Link href="/">
            <Image className="cursor-pointer" src={NavbarImage} alt="Site logo" />
          </Link>
        </div>

        {/* Desktop: Navigation Links */}
        <ul className="hidden left-0 lg:flex flex-1 justify-end items-center gap-5 text mr-7 uppercase text-md">
          {
            // Render all nav links (separate `NavbarLink` component).
            links.map((link, index) => (
              // Single Navigation Link
              <li key={index}>
                <Link
                  href={link.href}
                  scroll={link.href.includes('#') ? false : true}
                  className={`cursor-pointer dark:hover:bg-slate-600 dark:text-white hover:bg-slate-200 rounded transition-all duration-500 px-4 py-3`}>
                  <span
                    className={
                      activeNavItem === link.name ? 'border-b-2 px-0.5 pb-1 border-b-slate-500 dark:border-b-slate-300' : 'px-0.5'
                    }>
                    {link.title}
                  </span>
                </Link>
              </li>
            ))
          }
        </ul>

        {/* Desktop: Icon to toggle dark/light mode */}
        <div className="hidden lg:flex">
          <DarkModeToggle additionalCSS="w-14" />
        </div>

        {/* Mobile menu toggler (icon) and dark mode switch */}
        <div className="flex lg:hidden space-x-4 flex-1 justify-end text-3xl">
          {/* Icon to toggle dark/light mode */}
          <DarkModeToggle additionalCSS="w-14 m-2" />
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded p-1 m-2 w-14 transition-all
                        ease-in-out duration-200 hover:bg-slate-200 bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white
                        border border-slate-300 hover:border-slate-600 dark:border-slate-500 dark:hover:border-slate-200`}>
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <ul className="p-4 mt-2 block space-y-3 lg:hidden bg-slate-100 dark:bg-slate-700">
          {
            // Render all nav links (separate `NavbarLink` component).
            links.map((link, index) => (
              // Single Navigation Link
              <li
                key={index}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded bg-slate-200 hover:bg-slate-300 transition
                            ease-in-out duration-300 dark:bg-slate-600 dark:hover:bg-slate-500">
                <Link href={link.href} scroll={link.href.includes('#') ? false : true} className={`cursor-pointer block w-full px-3 py-2`}>
                  {link.title}
                </Link>
              </li>
            ))
          }
        </ul>
      )}
    </header>
  );
};

export default Navbar;
