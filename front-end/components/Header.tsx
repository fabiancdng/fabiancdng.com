import { useEffect } from "react";

/**
 * Data from the CMS for a link in the header (nested in headerData).
 */
interface headerLink {
    id: number,
    attributes: {
        title: string,
        url: string,
        createdAt: string,
        updatedAt: string,
    }
}

/**
 * Data from the CMS for a Header component.
 */
interface headerData {
    id: number,
    __component: string,
    links: {
        data: headerLink[],
    }
}

/**
 * Props for the Header component.
 */
interface headerProps {
    data: headerData,
}

const Header = ({ data }: headerProps) => {
    useEffect(() => {
        console.log('Header: ', data);
    }, []);

    return (
        <div>Header</div>
    );
}

export default Header