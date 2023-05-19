import Link from 'next/link';

export interface FooterLink {
  title: string;
  href: string;
}

/**
 * Props for the Footer component.
 */
interface FooterProps {
  text: string;
  links: FooterLink[] | null;
}

const Footer = ({ text, links }: FooterProps) => {
  return (
    <>
      <div className="spacer mt-44"></div>
      <footer className="w-full">
        <div className="container mx-auto flex flex-col justify-center items-center py-5">
          <p className="border-b leading-10 border-gray-300 dark:text-slate-200">{text}</p>
          <ul className="flex space-x-4">
            {
              // Render all footer links (separate `FooterLink` component).
              links?.map((link, index) => (
                <li key={index} className="text-gray-500 hover:underline leading-10">
                  <Link href={link.href} className="dark:text-slate-300 py-2 cursor-pointer">
                    {link.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
