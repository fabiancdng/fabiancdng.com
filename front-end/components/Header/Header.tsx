import { useEffect, useState } from "react";
import ImageData from "../../types/image";
import HeaderLink, { HeaderLinkData } from "./HeaderLink";
import { FaBars } from 'react-icons/fa';
import DarkModeToggle from "./DarkModeToggle";

/**
 * Data from the CMS for a Header component.
 */
interface headerData {
    id: number,
    __component: string,
    title: string|null,
    logo: {
        data: ImageData|null,
    },
    links: {
        data: HeaderLinkData[]|null,
    }
}

/**
 * Props for the Header component.
 */
interface headerProps {
    data: headerData,
    statics: {
        'CMS_URL': string,
    }
}

const Header = ({ data, statics }: headerProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [screenScreenWidth, setScreenWidth] = useState(window.innerWidth);

    // The width (in px) when the mobile nav is used instead.
    const menuBreakpoint = 640;

    useEffect(() => {
        console.log('Header: ', data);

        const handleResize = () => {
            // Update screenWidth state on resize.
            setScreenWidth(window.innerWidth);
            // Auto-toggle mobile menu when not in use anymore.
            if (screenScreenWidth < menuBreakpoint) setMobileMenuOpen(false);
        };

        // Event listener for keeping screenWidth up-to-date.
        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-20 bg-white dark:bg-slate-800">
            {/* Navigation */}
            <nav className="flex items-center px-2 sm:px-0 my-2 container mx-auto">
                {/* Site title/logo */}
                <div className="w-14 h-14 p-1 flex items-center">
                    <img src={ statics.CMS_URL ? statics.CMS_URL + data.logo.data?.attributes.url : '' } alt="" />
                    <h2 className="ml-2 text-2xl font-semibold">{ data.title }</h2>
                </div>
                {/* Navigation Links */}
                <ul className="hidden left-0 sm:flex flex-1 justify-end items-center gap-5 text mr-7 uppercase text-md">
                    {
                        // Render all header links (separate `HeaderLink` component).
                        data.links.data?.map((link, index) => (
                            // Single Navigation Link
                            <li key={ index }><HeaderLink data={ link } additionalCSS="dark:hover:bg-slate-600 dark:text-white hover:bg-slate-200 rounded transition-all duration-500 px-4 py-3" /></li>
                        ))
                    }
                </ul>

                {/* Icon to toggle dark/light mode */}
                <div className="hidden sm:flex">
                    <DarkModeToggle />
                </div>
                
                {/* Mobile menu toggler (icon) */}
                <div className="flex sm:hidden space-x-4 flex-1 justify-end text-3xl">
                    {/* Icon to toggle dark/light mode */}
                    <DarkModeToggle />
                    <button
                        onClick={ () => setMobileMenuOpen(!mobileMenuOpen) }
                        className={ `rounded p-2 border-white border transition-all
                        ease-in-out duration-200 hover:bg-slate-200 bg-slate-100` }
                    >
                        <FaBars />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            { mobileMenuOpen && <ul className="p-4 mt-2 block space-y-3 md:hidden bg-slate-100">

                {
                    // Render all header links (separate `HeaderLink` component).
                    data.links.data?.map((link, index) => (
                        // Single Navigation Link
                        <li onClick={ () => setMobileMenuOpen(false) } key={ index } className="rounded bg-slate-200 hover:bg-slate-300 transition ease-in-out duration-300"><HeaderLink data={ link } additionalCSS="block w-full px-3 py-2" /></li>
                    ))
                }
            </ul> }
        </header>
    );
}

export default Header;