// pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearProduct } from '../redux/slices/productSlice';
import { useTheme } from '../context/ThemeContext';
import ProjectsHeader from '../components/public/projects/ProjectsHeader';
import ProjectsSearchFilters from '../components/public/projects/ProjectsSearchFilters';
import ProjectsResultsInfo from '../components/public/projects/ProjectsResultsInfo';
import ProjectCard from '../components/public/projects/ProjectCard';
import ProjectCardList from '../components/public/projects/ProjectCardList';
import ProjectsPagination from '../components/public/projects/ProjectsPagination';
import ProjectsEmptyState from '../components/public/projects/ProjectsEmptyState';
import ProjectModal from '../components/public/projects/ProjectModal';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const { currentTheme, currentMood } = useTheme();
  const { products, pagination, loading, product } = useSelector((state) => state.products || {});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Get all unique tags from products
  const allTags = products ? [...new Set(products.flatMap(p => {
    if (Array.isArray(p.tags)) return p.tags;
    if (typeof p.tags === 'string') {
      try {
        return JSON.parse(p.tags);
      } catch {
        return p.tags.split(',').map(t => t.trim());
      }
    }
    return [];
  }))] : [];

  // Fetch products on mount and when filters change
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
    };
    
    // Add search
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    // Add tags filter
    if (selectedTags.length > 0) {
      params.tags = selectedTags.join(',');
    }
    
    // Add sorting
    if (sortBy === 'popular') {
      params.sortBy = 'likes';
      params.sortOrder = 'desc';
    } else if (sortBy === 'views') {
      params.sortBy = 'views';
      params.sortOrder = 'desc';
    } else if (sortBy === 'price-low') {
      params.sortBy = 'price';
      params.sortOrder = 'asc';
    } else if (sortBy === 'price-high') {
      params.sortBy = 'price';
      params.sortOrder = 'desc';
    } else {
      params.sortBy = 'createdAt';
      params.sortOrder = 'desc';
    }
    
    dispatch(getProducts(params));
  }, [dispatch, currentPage, itemsPerPage, sortBy, searchTerm, selectedTags]);

  // Clear product detail when modal closes
  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSortBy('latest');
    setCurrentPage(1);
  };

  const handleViewDetails = (productId) => {
    setSelectedProjectId(productId);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
    dispatch(clearProduct());
  };

  // Get the selected product from the list or from the product state
  const selectedProduct = selectedProjectId 
    ? products?.find(p => p._id === selectedProjectId) || product
    : null;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsHeader />
        
        <div className=" top-20 z-40 bg-white dark:bg-gray-900 pt-4 pb-2 shadow-sm">
          <ProjectsSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            allTags={allTags}
            clearFilters={clearFilters}
            currentTheme={currentTheme}
            setCurrentPage={setCurrentPage}
          />
        </div>
        
        <ProjectsResultsInfo 
          startIndex={(currentPage - 1) * itemsPerPage + 1}
          endIndex={Math.min(currentPage * itemsPerPage, pagination?.total || 0)}
          totalItems={pagination?.total || 0}
        />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : products?.length === 0 ? (
          <ProjectsEmptyState 
            onClearFilters={clearFilters} 
            currentTheme={currentTheme} 
            currentMood={currentMood} 
          />
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map(product => (
              <ProjectCard 
                key={product._id} 
                project={product} 
                onViewDetails={() => handleViewDetails(product._id)} 
                currentTheme={currentTheme} 
                currentMood={currentMood} 
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products?.map(product => (
              <ProjectCardList 
                key={product._id} 
                project={product} 
                onViewDetails={() => handleViewDetails(product._id)} 
                currentTheme={currentTheme} 
                currentMood={currentMood} 
              />
            ))}
          </div>
        )}
        
        {pagination && pagination.pages > 1 && (
          <ProjectsPagination 
            currentPage={currentPage} 
            totalPages={pagination.pages || 1} 
            paginate={setCurrentPage} 
            nextPage={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages || 1))}
            prevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            currentTheme={currentTheme} 
          />
        )}
      </div>
      
      {/* Standalone Project Modal */}
      {selectedProjectId && selectedProduct && (
        <ProjectModal 
          project={selectedProduct}
          productId={selectedProjectId}
          onClose={handleCloseModal} 
          currentTheme={currentTheme} 
          currentMood={currentMood}
        />
      )}
    </div>
  );
};

export default ProjectsPage;