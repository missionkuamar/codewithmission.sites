import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../redux/slices/projectSlice';
import ProjectForm from '../components/projects/ProjectForm';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AddProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (projectData) => {
    setLoading(true);
    try {
      await dispatch(createProject(projectData)).unwrap();
      toast.success('Project created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Share your amazing project with the community
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <ProjectForm onSubmit={handleSubmit} loading={loading} />
      </motion.div>
    </div>
  );
};

export default AddProjectPage;