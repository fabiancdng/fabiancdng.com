import { useEffect } from "react";
import staticsData from "../../types/statics";

/**
 * Data about a programming language from the CMS.
 */
interface programmingLanguageData {
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
export interface projectData {
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
            data: programmingLanguageData[]
        }
    }
}

/**
 * Props for the Project component.
 */
interface projectProps {
    data: projectData,
    statics: staticsData,
}

const Project = ({ data, statics }: projectProps) => {
    useEffect(() => {
        console.log('Project', data);
    }, []);

    return (
        <a href={
                data.attributes.url
                ? data.attributes.url
                : data.attributes.githubRepo ? 'https://github.com/' + data.attributes.githubRepo : 'javascript:void(0);'
            }
            target="fabiancdng"
            className="p-4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 hover:scale-105 transition-all flex flex-col justify-between overflow-hidden">
            {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">
                    { data.attributes.name }
                </div>
                <p className="text-gray-700 text-md">
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
                        <div key={ index } className="flex border-black mr-5 items-center mt-5 bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-black mb-2">
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
        {/* <div className="bg-slate-200 rounded-md p-5 flex flex-col justify-between">
            <h4 className="text-2xl">
                <a href={
                    data.attributes.url
                    ? data.attributes.url
                    : data.attributes.githubRepo ? 'https://github.com/' + data.attributes.githubRepo : 'javascript:void(0);'
                }>
                    { data.attributes.name }
                </a>
            </h4>
            <p className="mt-3">{ data.attributes.shortDescription }</p>
            <div className="grid grid-cols-2 gap-3">
                {
                    data.attributes.languages.data.map((language, index) => (
                        <div key={ index } className="flex items-center mt-5">
                            <span
                                className="rounded-full w-4 h-4 mr-2"
                                style={{ background: language.attributes.colorCode !== null ? language.attributes.colorCode : 'gray' }}
                            ></span>
                            <span>{ language.attributes.name }</span>
                        </div>
                    ))
                }
            </div>
        </div> */}
}

export default Project;