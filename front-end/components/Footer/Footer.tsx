import StaticsData from '../../types/statics';
import FooterLink from './FooterLink';

/**
 * Data from the CMS for a link in the header (nested in headerData).
 */
 interface FooterLink {
    id: number,
    attributes: {
        title: string,
        urlOrAnchor: string,
        createdAt: string,
        updatedAt: string,
    }
}

/**
 * Data from the CMS for a Footer component.
 */
interface FooterData {
    id: number,
    __component: string,
    text: string,
    links: {
        data: FooterLink[]|null,
    }
}

/**
 * Props for the Footer component.
 */
interface FooterProps {
    data: FooterData,
    statics: StaticsData,
}

const Footer = ({ data, statics }: FooterProps) => {
    return (
        <>
            <div className="spacer mt-36"></div>
            <footer className="dark:bg-slate-800 absolute left-0 -bottom-0 w-full">
                <div className="container mx-auto flex flex-col justify-center items-center py-5">
                    <p className="border-b border-gray-300 dark:text-slate-200">{ data.text }</p>
                    <ul className="flex">
                        {
                            // Render all header links (separate `FooterLink` component).
                            data.links.data?.map((link, index) => (
                                <li key={ index } className="mr-5 last:mr-0 text-gray-500 hover:underline"><FooterLink data={ link } /></li>
                            ))
                        }
                    </ul>
                </div>
            </footer>
        </>
    );
}

export default Footer;