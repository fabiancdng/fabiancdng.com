import { useEffect } from "react";
import HeaderLink, { headerLinkData } from "./HeaderLink";

/**
 * Data from the CMS for a Header component.
 */
interface headerData {
    id: number,
    __component: string,
    links: {
        data: headerLinkData[]|null,
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
        <>
            {
                // Render all header links (separate `HeaderLink` component).
                data.links.data?.map((link, index) => <HeaderLink key={ index } data={ link } />)
            }
        </>
    );
}

export default Header;