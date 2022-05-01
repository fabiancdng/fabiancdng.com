import StaticsData from "../../types/statics";

/**
 * Data about a programming language from the CMS.
 */
interface ProgrammingLanguageData {
    id: number,
    attributes: {
        name: string,
        homepage: string,
        createdAt: string,
        updatedAt: string,
        colorCode: string|null,
    },
}

/**
 * Data from the CMS for a single project.
 */
export interface ProjectData {
    id: number,
    attributes: {
        name: string,
        slug: string,
        url: string|null,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        githubRepo: string|null,
        shortDescription: string,
        longDescription: string,
        languages: {
            data: ProgrammingLanguageData[]
        }
    }
}

/**
 * Props for the Project component.
 */
interface ProjectProps {
    data: ProjectData,
    statics: StaticsData,
}

const Project = ({ data, statics }: ProjectProps) => {
    return (
        <a href={
                data.attributes.url
                ? data.attributes.url
                : data.attributes.githubRepo ? 'https://github.com/' + data.attributes.githubRepo : ''
            }
            target="fabiancdng"
            className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600 shadow-md hover:bg-gray-50 hover:scale-[1.03] transition-all flex flex-col justify-between overflow-hidden">
            {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
            <div className="px-6 py-4">
                <div className="font-semibold text-2xl mb-2 dark:text-slate-200">
                    { data.attributes.name }
                </div>
                <p className="text-gray-700 text-md dark:text-slate-300">
                    { data.attributes.shortDescription }
                </p>
            </div>
            <div className="px-6 pt-2 pb-2">
                {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
                <div className="flex">
                {
                    data.attributes.languages.data.map((language, index) => (
                        <div key={ index } className="flex border-black dark:border-slate-100 dark:bg-slate-700 mr-5 items-center mt-5 bg-gray-100 rounded-full px-3 py-1 text-sm
                        font-semibold text-black dark:text-slate-100 mb-2">
                            <span
                                className="rounded-full w-4 h-4 mr-2"
                                style={{ background: language.attributes.colorCode !== null ? language.attributes.colorCode : 'gray' }}
                            ></span>
                            <span>{ language.attributes.name }</span>
                        </div>
                    ))
                }
                </div>
            </div>
        </a>
        );
}

export default Project;