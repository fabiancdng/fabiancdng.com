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
    }
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
        <div className="w-screen bg-slate-400">
            <div className="container mx-auto">
                {/* Title and subtitle */}
                <h1 className="text-gray-800 text-4xl pt-10">{ data.title }</h1>
                <h2 className="text-gray-700 text-2xl mb-10">{ data.subtitle }</h2>

                {/* Projects */}
                <div className="grid grid-cols-2 gap-3 pb-20">
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