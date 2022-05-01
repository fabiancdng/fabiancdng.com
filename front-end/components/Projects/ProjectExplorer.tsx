import { useEffect } from "react";
import staticsData from "../../types/statics";
import Project, { projectData } from "./Project";

/**
 * Data from the CMS for a `ProjectExplorer` component.
 */
interface projectExplorerData {
    id: number,
    __component: string,
    title: string,
    subtitle: string,
    projects: {
        data: projectData[]|null,
    },
    htmlAnchor: string,
}

/**
 * Props for the Header component.
 */
interface projectExplorerProps {
    data: projectExplorerData,
    statics: staticsData,
}

const ProjectExplorer = ({ data, statics }: projectExplorerProps) => {
    useEffect(() => {
        console.log('ProjectExplorer', data);
        console.log(data.projects.data);
    }, []);

    return (
        <div id={ data.htmlAnchor } className="w-screen">
            <div className="container mx-auto">
                {/* Title and subtitle */}
                <h1 className="text-gray-800 text-5xl font-semibold pt-20 text-center sm:text-left mx-4 sm:mx-0">{ data.title }</h1>
                <h2 className="text-gray-800 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">{ data.subtitle }</h2>

                {/* Projects */}
                <div className="grid sm:grid-cols-2 mx-4 sm:mx-0 gap-4 pb-20">
                    {
                        // Render all Projects (separate `Project` component).
                        data.projects.data?.map((project, index) => <Project key={ index } data={ project } statics={ statics } />)
                    }
                </div>

            </div>
        </div>
    );
}

export default ProjectExplorer;