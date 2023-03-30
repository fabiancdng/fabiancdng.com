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
    <Link href={href} className="dark:text-slate-300 cursor-pointer">
      {title}
    </Link>
  );
};

export default FooterLink;
