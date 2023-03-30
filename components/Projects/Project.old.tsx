/**
 * Data about a programming language from the CMS.
 */
interface programmingLanguage {
  name: string;
  homepage: string;
  colorCode: string | null;
}

/**
 * Props for the Project component.
 */
export interface projectProps {
  name: string;
  slug: string;
  href: string | null;
  githubRepo: string | null;
  shortDescription: string;
  longDescription: string;
  languages: programmingLanguage[];
}

const Project = (props: projectProps) => {
  return (
    <a
      href={
        props.href
          ? props.href
          : props.githubRepo
          ? 'https://github.com/' + props.githubRepo
          : ''
      }
      target="fabiancdng"
      className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600 shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all flex flex-col justify-between overflow-hidden">
      {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
      <div className="px-6 py-4">
        <div className="font-semibold text-2xl mb-2 dark:text-slate-200">
          {props.name}
        </div>
        <p className="text-gray-700 text-md dark:text-slate-300">
          {props.shortDescription}
        </p>
      </div>
      <div className="px-6 pt-2 pb-2">
        {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
        <div className="flex">
          {props.languages.map((language, index) => (
            <div
              key={index}
              className="flex border-black dark:border-slate-100 dark:bg-slate-700 mr-5 items-center mt-5 bg-gray-100 rounded-full px-3 py-1 text-sm
                        font-semibold text-black dark:text-slate-100 mb-2">
              <span
                className="rounded-full w-4 h-4 mr-2"
                style={{
                  background:
                    language.colorCode !== null ? language.colorCode : 'gray',
                }}></span>
              <span>{language.name}</span>
            </div>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Project;
