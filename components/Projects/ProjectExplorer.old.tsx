import Project, { projectProps } from './Project.old';

/**
 * Props for the ProjectExplorer component.
 */
interface projectExplorerProps {
  title: string;
  subtitle: string;
  projects: projectProps[] | null;
  htmlAnchor: string;
}

const ProjectExplorer = (props: projectExplorerProps) => {
  return (
    <div id={props.htmlAnchor} className="w-screen dark:bg-slate-900">
      <div className="container mx-auto">
        {/* Title and subtitle */}
        <h1 className="text-gray-800 dark:text-slate-100 text-5xl font-semibold pt-28 text-center sm:text-left mx-4 sm:mx-0">
          {props.title}
        </h1>
        <h2 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 text-center sm:text-left mx-4 sm:mx-0">
          {props.subtitle}
        </h2>

        {/* Projects */}
        <div className="grid sm:grid-cols-2 mx-4 sm:mx-0 gap-4 pb-20">
          {
            // Render all Projects (separate `Project` component).
            props.projects?.map((project, index) => (
              <Project
                key={index}
                name={project.name}
                slug={project.slug}
                href={project.href}
                githubRepo={project.githubRepo}
                shortDescription={project.shortDescription}
                longDescription={project.longDescription}
                languages={project.languages}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;
