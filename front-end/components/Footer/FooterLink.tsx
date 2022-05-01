/**
 * Data from the CMS for a link in the header.
 */
export interface FooterLinkData {
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
interface FooterLinkProps {
    data: FooterLinkData,
}

const FooterLink = ({ data }: FooterLinkProps) => {
    return <a className="dark:text-slate-300" href={ data.attributes.urlOrAnchor }>{ data.attributes.title }</a>;
}

export default FooterLink;