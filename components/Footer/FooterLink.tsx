import Link from 'next/link';

/**
 * Props for the FooterLink component.
 */
export interface footerLink {
  title: string;
  href: string;
}

const FooterLink = ({ title, href }: footerLink) => {
  return (
    <Link href={href} passHref={true}>
      <a className="dark:text-slate-300 cursor-pointer">{title}</a>
    </Link>
  );
};

export default FooterLink;
