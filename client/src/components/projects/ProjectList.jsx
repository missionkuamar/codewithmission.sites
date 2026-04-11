import ProjectCard from './ProjectCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ProjectList = ({ projects, isLoading, emptyMessage = 'No projects found' }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;