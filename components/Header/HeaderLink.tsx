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
    <Link href={href} className={'cursor-pointer ' + additionalCSS}>
      {title}
    </Link>
  );
};

export default HeaderLink;
