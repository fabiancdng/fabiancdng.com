import { useEffect } from "react";

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
}

const Footer = ({ data }: footerProps) => {
    useEffect(() => {
        console.log('Footer', data);
    }, []);

    return (
        <div>Footer</div>
    );
}

export default Footer;