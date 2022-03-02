import { useEffect } from "react";

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
    }
}

/**
 * Props for the Project component.
 */
interface projectProps {
    data: projectData,
}

const Project = ({ data }: projectProps) => {
    useEffect(() => {
        console.log('Project', data);
    }, []);

    return (
        <div>Project</div>
    );
}

export default Project;