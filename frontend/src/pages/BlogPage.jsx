// pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { getBlogs, getBlog, likeBlog, clearBlog } from '../redux/slices/blogSlice';
import BlogHeader from '../components/blog/BlogHeader';
import BlogStats from '../components/public/user/blogpost/BlogStats';
import BlogSearchFilters from '../components/public/user/blogpost/BlogSearchFilters';
import BlogResultsInfo from '../components/public/user/blogpost/BlogResultsInfo';
import BlogCard from '../components/public/user/blogpost/BlogCard';
import BlogCardList from '../components/public/user/blogpost/BlogCardList';
import BlogPagination from '../components/blog/BlogPagination';
import BlogEmptyState from '../components/blog/BlogEmptyState';
import BlogModal from '../components/public/user/blogpost/BlogModal';
import toast from 'react-hot-toast';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { currentTheme, currentMood } = useTheme();
  const { blogs, pagination, loading, blog } = useSelector((state) => state.blogs || {});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  // Get unique categories from blogs
  const categories = ['all', ...new Set(blogs?.map(post => post.category) || [])];

  // Fetch blogs when filters change
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      public: 'true', // Only show published posts
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    
    // Add search
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    // Add category filter
    if (selectedCategory && selectedCategory !== 'all') {
      params.category = selectedCategory;
    }
    
    // Add sorting
    if (sortBy === 'popular') {
      params.sortBy = 'likes';
      params.sortOrder = 'desc';
    } else if (sortBy === 'trending') {
      params.sortBy = 'views';
      params.sortOrder = 'desc';
    } else if (sortBy === 'comments') {
      params.sortBy = 'comments';
      params.sortOrder = 'desc';
    }
    
    dispatch(getBlogs(params));
  }, [dispatch, currentPage, itemsPerPage, searchTerm, selectedCategory, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [searchTerm, selectedCategory, sortBy]);

  // Clear blog detail on unmount
  useEffect(() => {
    return () => {
      dispatch(clearBlog());
    };
  }, [dispatch]);

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
    toast.success(bookmarkedPosts.includes(postId) ? 'Removed from bookmarks' : 'Added to bookmarks ❤️');
  };

  const handleViewDetails = (postId) => {
    setSelectedPostId(postId);
    // Fetch full post details
    dispatch(getBlog(postId));
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
    dispatch(clearBlog());
  };

  const handleLike = async (postId) => {
    try {
      await dispatch(likeBlog(postId)).unwrap();
      toast.success('Liked! ❤️');
    } catch (error) {
      toast.error(error.message || 'Failed to like post');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('latest');
    setCurrentPage(1);
  };

  // Get selected post from blogs list or from fetched blog
  const selectedPost = selectedPostId 
    ? blogs?.find(p => p._id === selectedPostId) || blog
    : null;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeader />
        
        <BlogStats 
          posts={blogs} 
          currentTheme={currentTheme} 
          currentMood={currentMood} 
          loading={loading}
        />
        
        <BlogSearchFilters
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
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          currentTheme={currentTheme}
          setCurrentPage={setCurrentPage}
        />
        
        <BlogResultsInfo 
          startIndex={(currentPage - 1) * itemsPerPage + 1}
          endIndex={Math.min(currentPage * itemsPerPage, pagination?.total || 0)}
          totalItems={pagination?.total || 0}
          bookmarkedCount={bookmarkedPosts.length}
        />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : blogs?.length === 0 ? (
          <BlogEmptyState 
            onClearFilters={clearFilters} 
            currentTheme={currentTheme} 
            currentMood={currentMood} 
          />
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.map(post => (
              <BlogCard 
                key={post._id} 
                post={post} 
                onViewDetails={() => handleViewDetails(post._id)} 
                onLike={() => handleLike(post._id)}
                isBookmarked={bookmarkedPosts.includes(post._id)} 
                onBookmark={() => toggleBookmark(post._id)} 
                currentTheme={currentTheme} 
                currentMood={currentMood} 
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {blogs?.map(post => (
              <BlogCardList 
                key={post._id} 
                post={post} 
                onViewDetails={() => handleViewDetails(post._id)} 
                onLike={() => handleLike(post._id)}
                isBookmarked={bookmarkedPosts.includes(post._id)} 
                onBookmark={() => toggleBookmark(post._id)} 
                currentTheme={currentTheme} 
                currentMood={currentMood} 
              />
            ))}
          </div>
        )}
        
        {pagination && pagination.pages > 1 && (
          <BlogPagination 
            currentPage={currentPage} 
            totalPages={pagination.pages || 1} 
            paginate={setCurrentPage} 
            nextPage={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages || 1))}
            prevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            currentTheme={currentTheme} 
          />
        )}
      </div>
      
      {selectedPostId && selectedPost && (
        <BlogModal 
          post={selectedPost}
          postId={selectedPostId}
          onClose={handleCloseModal} 
          onLike={handleLike}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />
      )}
    </div>
  );
};

export default BlogPage;