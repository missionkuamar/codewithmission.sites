import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ImageUpload from './ImageUpload';
import { FiSave, FiX } from 'react-icons/fi';

const projectTypes = ['Frontend', 'Fullstack', 'AI', 'Backend', 'Mobile', 'Other'];

const ProjectForm = ({ onSubmit, initialData, loading }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, setError, clearErrors } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      githubUrl: '',
      liveUrl: '',
      tags: [],
      type: 'Frontend',
      coverImage: '',
      images: [],
    }
  });

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(initialData?.tags || []);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const handleImageUpload = (urls) => {
    if (urls.length > 0) {
      const coverImageUrl = urls[0];
      setCoverImage(coverImageUrl);
      setValue('coverImage', coverImageUrl);
      setValue('images', urls);
      // Clear cover image error if exists
      clearErrors('coverImage');
    } else {
      setCoverImage('');
      setValue('coverImage', '');
      setValue('images', []);
    }
  };

  // Watch cover image to validate
  const watchCoverImage = watch('coverImage');
  
  useEffect(() => {
    if (!watchCoverImage && !loading) {
      setError('coverImage', { message: 'Cover image is required' });
    } else {
      clearErrors('coverImage');
    }
  }, [watchCoverImage, loading, setError, clearErrors]);

  const submitForm = (data) => {
    // Validate cover image
    if (!coverImage) {
      setError('coverImage', { message: 'Please upload a cover image' });
      return;
    }
    
    onSubmit({
      ...data,
      tags,
      coverImage,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Project Title *</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="input-field"
          placeholder="Enter project title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows="4"
          className="input-field"
          placeholder="Describe your project..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block text-sm font-medium mb-2">GitHub URL *</label>
        <input
          {...register('githubUrl', { 
            required: 'GitHub URL is required',
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL'
            }
          })}
          className="input-field"
          placeholder="https://github.com/username/project"
        />
        {errors.githubUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>
        )}
      </div>

      {/* Live URL */}
      <div>
        <label className="block text-sm font-medium mb-2">Live Demo URL *</label>
        <input
          {...register('liveUrl', { 
            required: 'Live URL is required',
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL'
            }
          })}
          className="input-field"
          placeholder="https://your-project.com or http://localhost:3000"
        />
        {errors.liveUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.liveUrl.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">You can use localhost for testing</p>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            className="flex-1 input-field"
            placeholder="Add tags (React, Node.js, etc.)"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="btn-secondary"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-600"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Project Type *</label>
        <select
          {...register('type', { required: 'Project type is required' })}
          className="input-field"
        >
          {projectTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Project Images *
          <span className="text-xs text-gray-500 ml-2">(First image will be cover)</span>
        </label>
        <ImageUpload
          onImageUpload={handleImageUpload}
          existingImages={initialData?.images || []}
          multiple={true}
          required={true}
        />
        {errors.coverImage && (
          <p className="text-red-500 text-sm mt-1">{errors.coverImage.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <FiSave />
          <span>{loading ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}</span>
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;