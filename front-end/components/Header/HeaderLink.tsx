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
    additionalCSS: string,
}

const HeaderLink = ({ data, additionalCSS }: headerLinkProps) => {
    return <a className={ additionalCSS } href={ data.attributes.url }>{ data.attributes.title }</a>;
}

export default HeaderLink;