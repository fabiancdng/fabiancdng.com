import Link from 'next/link';

/**
 * Props for the NavbarLink component.
 */
interface NavbarLinkProps {
  title: string;
  href: string;
  active: boolean;
  additionalCSS: string;
}

const NavbarLink = ({
  title,
  href,
  active,
  additionalCSS,
}: NavbarLinkProps) => {
  return (
    <Link href={href} className={`cursor-pointer ${additionalCSS}`}>
      <span
        className={
          active
            ? 'border-b-2 px-0.5 pb-1 border-b-slate-500 dark:border-b-slate-300'
            : 'px-0.5'
        }>
        {title}
      </span>
    </Link>
  );
};

export default NavbarLink;
