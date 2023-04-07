import Link from 'next/link';

/**
 * Props for the NavbarLink component.
 */
interface navbarLinkProps {
  title: string;
  href: string;
  additionalCSS: string;
}

const NavbarLink = ({ title, href, additionalCSS }: navbarLinkProps) => {
  return (
    <Link href={href} className={'cursor-pointer ' + additionalCSS}>
      {title}
    </Link>
  );
};

export default NavbarLink;
