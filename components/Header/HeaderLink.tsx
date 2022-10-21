import Link from 'next/link';

/**
 * Props for the HeaderLink component.
 */
interface headerLinkProps {
  title: string;
  href: string;
  additionalCSS: string;
}

const HeaderLink = ({ title, href, additionalCSS }: headerLinkProps) => {
  return (
    <Link href={href} passHref={true}>
      <a className={'cursor-pointer ' + additionalCSS}>{title}</a>
    </Link>
  );
};

export default HeaderLink;
