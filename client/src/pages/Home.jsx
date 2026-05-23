import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from '../components/PostCard';
import usePostStore from '../store/postStore';
import { categories } from '../utils/constants';

const Home = () => {
  const { posts, fetchPosts, pagination, loading } = usePostStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts(currentPage, selectedCategory, searchQuery);
  }, [currentPage, selectedCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          
          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;