import { useEffect } from "react";

/**
 * Data from the CMS for a single project (nested in `projectExplorerData`).
 */
interface projectData {
    id: number,
    attributes: {
      name: string,
      slug: string,
      url: string|null,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
      githubRepo: string|null,
    }
}

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
    }, []);

    return (
        <div>ProjectExplorer</div>
    );
}

export default ProjectExplorer;