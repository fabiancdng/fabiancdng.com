import { useEffect } from "react";
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
}

const ProjectExplorer = ({ data }: projectExplorerProps) => {
    useEffect(() => {
        console.log('ProjectExplorer', data);
        console.log(data.projects.data);
    }, []);

    return (
        <>
            {
                // Render all Projects (separate `Project` component).
                data.projects.data?.map((project, index) => <Project key={ index } data={ project } />)
            }
        </>
    );
}

export default ProjectExplorer;