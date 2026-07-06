import React from 'react';
import { Edit, Trash2, Eye, Loader, FileText } from 'lucide-react';

const ProjectsTable = ({
  projects,
  loading,
  currentTheme,
  onTogglePublish,
  onToggleFeatured,
  onDelete,
  onEdit
}) => {

  if (loading) {
    return (
      <div className={`${currentTheme.card} p-12 text-center`}>
        <Loader size={40} className="animate-spin mx-auto" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={`${currentTheme.card} p-12 text-center`}>
        <FileText size={48} className="mx-auto opacity-30 mb-3" />
        <p className="opacity-75">No projects found</p>
      </div>
    );
  }

  return (
    <div className={`${currentTheme.card} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* HEADER */}
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="p-4">Project</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Sales</th>
              <th className="p-4">Revenue</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {project.images[0] && (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{project.title}</p>
                      <p className="text-xs opacity-75">
                        {project.description?.substring(0, 50)}...
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20">
                    {project.category}
                  </span>
                </td>

                <td className="p-4">
                  <div className="font-semibold">${project.price}</div>
                  {project.discount > 0 && (
                    <div className="text-xs text-green-500">
                      -{project.discount}%
                    </div>
                  )}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onTogglePublish(project.id)}
                    className={`px-2 py-1 rounded-lg text-xs ${
                      project.published
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {project.published ? 'Published' : 'Draft'}
                  </button>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onToggleFeatured(project.id)}
                    className={`px-2 py-1 rounded-lg text-xs ${
                      project.featured
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-gray-500/20'
                    }`}
                  >
                    {project.featured ? 'Featured' : 'Standard'}
                  </button>
                </td>

                <td className="p-4">{project.sales}</td>

                <td className="p-4">
                  ${project.revenue.toLocaleString()}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(project)}
                      className="p-1 hover:text-blue-500 transition-colors"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(project.id)}
                      className="p-1 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button className="p-1 hover:text-green-500 transition-colors">
                      <Eye size={18} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;