import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../../redux/slices/projectSlice';
import { FiSearch, FiX } from 'react-icons/fi';

const projectTypes = ['All', 'Frontend', 'Fullstack', 'AI', 'Backend', 'Mobile', 'Other'];
const popularTags = ['React', 'Node.js', 'MongoDB', 'Express', 'Python', 'AI', 'Machine Learning', 'JavaScript', 'TypeScript', 'Next.js'];

const ProjectFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.projects);

  const handleSearch = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleTypeChange = (type) => {
    dispatch(setFilters({ type: type === 'All' ? '' : type }));
  };

  const handleTagClick = (tag) => {
    dispatch(setFilters({ tag: filters.tag === tag ? '' : tag }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = filters.search || filters.type || filters.tag;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-20">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={filters.search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        {filters.search && (
          <button
            onClick={() => dispatch(setFilters({ search: '' }))}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <FiX className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Project Types */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Project Type</h3>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                (type === 'All' && !filters.type) || filters.type === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filters.tag === tag
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300"
        >
          <FiX />
          <span>Clear All Filters</span>
        </button>
      )}
    </div>
  );
};

export default ProjectFilters;