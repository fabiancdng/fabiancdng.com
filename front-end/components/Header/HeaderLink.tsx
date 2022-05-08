import Link from "next/link";

/**
 * Data from the CMS for a link in the header.
 */
export interface HeaderLinkData {
    id: number,
    attributes: {
        title: string,
        urlOrAnchor: string,
        createdAt: string,
        updatedAt: string,
    }
}

/**
 * Props for the HeaderLink component.
 */
interface HeaderLinkProps {
    data: HeaderLinkData,
    additionalCSS: string,
}

const HeaderLink = ({ data, additionalCSS }: HeaderLinkProps) => {
    return <Link href={ data.attributes.urlOrAnchor }><p className={ 'cursor-pointer ' + additionalCSS }>{ data.attributes.title }</p></Link>;
}

export default HeaderLink;