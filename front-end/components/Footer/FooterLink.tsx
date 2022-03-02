/**
 * Data from the CMS for a link in the header.
 */
export interface footerLinkData {
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
interface footerLinkProps {
    data: footerLinkData,
}

const FooterLink = ({ data }: footerLinkProps) => {
    return <a href={ data.attributes.url }>{ data.attributes.title }</a>;
}

export default FooterLink;