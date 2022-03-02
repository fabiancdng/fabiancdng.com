import { useEffect } from "react";

/**
 * Data from the CMS for a link in the header.
 */
export interface headerLinkData {
    id: number,
    attributes: {
        title: string,
        url: string,
        createdAt: string,
        updatedAt: string,
    }
}

/**
 * Props for the HeaderLink component.
 */
interface headerLinkProps {
    data: headerLinkData,
}

const HeaderLink = ({ data }: headerLinkProps) => {
    useEffect(() => {
        console.log('HeaderLink', data);
    }, []);

    return (
        <div>HeaderLink { data.attributes.title }</div>
    );
}

export default HeaderLink;