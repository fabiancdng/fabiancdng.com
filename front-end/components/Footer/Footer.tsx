import { useEffect } from "react";
import staticsData from "../../types/statics";
import FooterLink from "./FooterLink";

/**
 * Data from the CMS for a link in the header (nested in headerData).
 */
 interface footerLink {
    id: number,
    attributes: {
        title: string,
        url: string,
        createdAt: string,
        updatedAt: string,
    }
}

/**
 * Data from the CMS for a Footer component.
 */
interface footerData {
    id: number,
    __component: string,
    text: string,
    links: {
        data: footerLink[]|null,
    }
}

/**
 * Props for the Footer component.
 */
interface footerProps {
    data: footerData,
    statics: staticsData,
}

const Footer = ({ data, statics }: footerProps) => {
    useEffect(() => {
        console.log('Footer', data);
    }, []);

    return (
        <footer className="container mx-auto flex flex-col justify-center items-center py-5">
            <p className="border-b border-gray-300">{ data.text }</p>
            <ul className="flex">
                {
                    // Render all header links (separate `FooterLink` component).
                    data.links.data?.map((link, index) => (
                        <li key={ index } className="mr-5 last:mr-0 text-gray-500 hover:underline"><FooterLink data={ link } /></li>
                    ))
                }
            </ul>
        </footer>
    );
}

export default Footer;