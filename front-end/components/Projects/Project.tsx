import { useEffect } from "react";
import staticsData from "../../types/statics";

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
        <div className="bg-slate-200 rounded-md p-5">
            <h4 className="text-2xl">{ data.attributes.name }</h4>
            <p>{ data.attributes.shortDescription }</p>
        </div>
    );
}

export default Project;