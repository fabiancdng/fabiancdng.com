import FooterLink, { footerLink } from './FooterLink';

/**
 * Props for the Footer component.
 */
interface footerProps {
  text: string;
  links: footerLink[] | null;
}

const Footer = ({ text, links }: footerProps) => {
  return (
    <>
      <div className="spacer mt-44"></div>
      <footer className="absolute left-0 -bottom-0 w-full">
        <div className="container mx-auto flex flex-col justify-center items-center py-5">
          <p className="border-b leading-10 border-gray-300 dark:text-slate-200">
            {text}
          </p>
          <ul className="flex">
            {
              // Render all footer links (separate `FooterLink` component).
              links?.map((link, index) => (
                <li
                  key={index}
                  className="mr-5 last:mr-0 text-gray-500 hover:underline leading-10">
                  <FooterLink title={link.title} href={link.href} />
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
