import { useEffect, useState } from "react";
import imageData from "../../types/image";
import HeaderLink, { headerLinkData } from "./HeaderLink";
import { FaBars } from 'react-icons/fa';

/**
 * Data from the CMS for a Header component.
 */
interface headerData {
    id: number,
    __component: string,
    title: string|null,
    logo: {
        data: imageData|null,
    },
    links: {
        data: headerLinkData[]|null,
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
        <header className="fixed top-0 left-0 w-full z-20">
            {/* Navigation */}
            <nav className="flex items-center px-2 sm:px-0 mt-2 sm:mt-4 container mx-auto">
                {/* Site title/logo */}
                <div className="w-14 h-14 flex items-center">
                    <img src={ statics.CMS_URL ? statics.CMS_URL + data.logo.data?.attributes.url : '' } alt="" />
                    <h2 className="ml-2 text-2xl font-semibold">{ data.title }</h2>
                </div>
                {/* Navigation Links */}
                <ul className="hidden left-0 sm:flex flex-1 justify-end items-center gap-5 text mr-7 uppercase text-md">
                    {
                        // Render all header links (separate `HeaderLink` component).
                        data.links.data?.map((link, index) => (
                            // Single Navigation Link
                            <li key={ index } className=""><HeaderLink data={ link } additionalCSS="hover:bg-slate-200 rounded p-3 transition-all duration-500" /></li>
                        ))
                    }
                </ul>
                
                {/* Mobile menu toggler (icon) */}
                <div className="flex sm:hidden flex-1 justify-end text-2xl">
                    <button onClick={ () => setMobileMenuOpen(!mobileMenuOpen) } className="rounded focus:bg-slate-100 p-2 focus:border-slate-300 border-white border transition-all ease-in-out duration-200">
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
                        <li key={ index } className="rounded bg-slate-200 hover:bg-slate-300 transition ease-in-out duration-300"><HeaderLink data={ link } additionalCSS="block w-full px-3 py-2" /></li>
                    ))
                }
            </ul> }
        </header>
    );
}

export default Header;