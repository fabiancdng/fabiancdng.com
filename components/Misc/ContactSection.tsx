import { SbBlokData, storyblokEditable } from '@storyblok/react';

/**
 * Props for the ContactSection component.
 */
interface ContactSectionBlock extends SbBlokData {
  title: string;
  subtitle: string;
  htmlAnchor: string;
  destinationEmail: string;
  additionalCSS: string;
}

const ContactSection = ({ blok }: { blok: ContactSectionBlock }) => {
  return (
    <div
      id={blok.htmlAnchor}
      className={`w-screen flex flex-col lg:flex-row container xl:max-w-7xl max-w-5xl mx-auto px-10
        dark:bg-slate-800 bg-slate-100 pb-20 ${blok.additionalCSS}`}
      {...storyblokEditable(blok)}>
      {/* Responsive wrapper left */}
      <div className="container mx-auto px-16 pt-20 flex flex-col items-center lg:items-start w-full lg:w-5/12">
        {/* Title */}
        <h1 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold text-center lg:text-start mx-4 sm:mx-0">
          {blok.title}
        </h1>

        {/* Subtitle */}
        {blok.subtitle && (
          <h2 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 mx-4 text-center lg:text-start sm:mx-0">
            {blok.subtitle}
          </h2>
        )}

        {/* Destination Email */}
        {blok.destinationEmail && (
          <div
            className={`w-full hover:bg-slate-300 bg-slate-200 rounded cursor-pointer
                      text-md transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
                      flex flex-row justify-center items-center align-center border border-slate-300 hover:border-slate-600
                      dark:border-slate-500 dark:hover:border-slate-200`}>
            <i className="fa-regular fa-envelope text-2xl ml-5" />
            <a
              href={`mailto:${blok.destinationEmail}?subject=Inquiry regarding &body=%0D%0A%0D%0Avia fabiancdng.com`}
              className="font-medium py-4 px-5">
              {blok.destinationEmail}
            </a>
          </div>
        )}
      </div>

      {/* Responsive wrapper right */}
      <div className="container px-16 pt-10 lg:pt-20 mx-auto flex flex-col items-center lg:items-start w-full lg:w-7/12">
        <div className="w-full mb-5 mt-10 mx-auto text-center text-gray-800">
          <form>
            {/* Name input */}
            <div className="form-group mb-6">
              <input
                type="text"
                className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                    dark:bg-slate-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                id="exampleInput7"
                placeholder="Name"
              />
            </div>

            {/* Email input */}
            <div className="form-group mb-6">
              <input
                type="email"
                className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 dark:bg-slate-300 bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none`}
                id="exampleInput8"
                placeholder="Email address"
              />
            </div>

            {/* Message textarea */}
            <div className="form-group w-full mb-6">
              <textarea
                w-full
                className={`form-control block px-3 py-1.5 w-full text-base font-normal text-black dark:bg-slate-300 dark:focus:bg-slate-300 bg-clip-padding
                  border border-solid border-gray-300 rounded transition ease-in-out m-0
                  focus:bg-white focus:border-blue-600 focus:outline-none`}
                id="exampleFormControlTextarea13"
                rows={3}
                placeholder="Message"></textarea>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`w-full hover:bg-slate-300 bg-slate-200 rounded cursor-pointer
              text-md mx-auto transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
              flex flex-row justify-center space-x-3 items-center align-center border border-slate-300 hover:border-slate-600
              dark:border-slate-500 dark:hover:border-slate-200 py-2`}>
              <i className="fa-regular fa-paper-plane" />
              <p>Send</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
