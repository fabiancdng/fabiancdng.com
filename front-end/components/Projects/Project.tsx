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
        <div className="bg-slate-200 rounded-md p-5 flex flex-col justify-between">
            <h4 className="text-2xl">{ data.attributes.name }</h4>
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
        </div>
    );
}

export default Project;