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
    return <a className={ additionalCSS } href={ data.attributes.urlOrAnchor }>{ data.attributes.title }</a>;
}

export default HeaderLink;