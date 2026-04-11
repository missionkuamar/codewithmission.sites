import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectById, deleteProject, clearCurrentProject } from '../redux/slices/projectSlice';
import { FiGithub, FiExternalLink, FiArrowLeft, FiEdit2, FiTrash2, FiEye, FiHeart, FiCalendar, FiTag, FiFolder } from 'react-icons/fi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/helpers';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProject, isLoading } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProjectById(id));
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await dispatch(deleteProject(id)).unwrap();
        toast.success('Project deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const isOwner = currentProject?.user?._id === user?._id || user?.role === 'admin';

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/" className="text-primary-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition"
        >
          <FiArrowLeft />
          <span>Back to projects</span>
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Image Gallery */}
          {currentProject.images && currentProject.images.length > 0 && (
            <div className="relative">
              <div className="h-96 bg-gray-900">
                <img
                  src={currentProject.images[activeImage]}
                  alt={currentProject.title}
                  className="w-full h-full object-contain"
                />
              </div>
              {currentProject.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {currentProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        activeImage === idx
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentProject.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FiCalendar />
                    {formatDate(currentProject.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiEye />
                    {currentProject.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FiHeart />
                    {currentProject.likes} likes
                  </span>
                </div>
              </div>
              
              {isOwner && (
                <div className="flex gap-2">
                  <Link
                    to={`/edit-project/${currentProject._id}`}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition flex items-center gap-2"
                  >
                    <FiEdit2 />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
                  >
                    <FiTrash2 />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Project Type Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                <FiFolder />
                {currentProject.type}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {currentProject.description}
              </p>
            </div>

            {/* Tags */}
            {currentProject.tags && currentProject.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <FiTag />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t dark:border-gray-700">
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition"
              >
                <FiGithub />
                <span>View on GitHub</span>
              </a>
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition"
              >
                <FiExternalLink />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Project Author</h2>
          <div className="flex items-center gap-4">
            {currentProject.user?.avatar ? (
              <img
                src={currentProject.user.avatar}
                alt={currentProject.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
                {currentProject.user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold">{currentProject.user?.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentProject.user?.email}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;