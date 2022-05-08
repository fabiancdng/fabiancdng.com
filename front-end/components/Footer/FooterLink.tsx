import Link from "next/link";

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
    return <Link href={ data.attributes.urlOrAnchor }><p className="dark:text-slate-300 cursor-pointer">{ data.attributes.title }</p></Link>;
}

export default FooterLink;