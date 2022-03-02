import { useEffect } from "react";
import staticsData from "../../types/statics";

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
        <li>HeaderLink { data.attributes.title }</li>
    );
}

export default HeaderLink;