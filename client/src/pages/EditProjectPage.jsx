import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProjectById, updateProject, clearCurrentProject } from '../redux/slices/projectSlice';
import ProjectForm from '../components/projects/ProjectForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const EditProjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProject, isLoading } = useSelector((state) => state.projects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectById(id));
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [dispatch, id]);

  const handleSubmit = async (projectData) => {
    setLoading(true);
    try {
      await dispatch(updateProject({ id, projectData })).unwrap();
      toast.success('Project updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Update your project details
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <ProjectForm 
          onSubmit={handleSubmit} 
          initialData={currentProject}
          loading={loading}
        />
      </motion.div>
    </div>
  );
};

export default EditProjectPage;