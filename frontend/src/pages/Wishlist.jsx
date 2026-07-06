// pages/Wishlist.jsx - Main Wishlist Page
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import WishlistHeader from '../components/wishlist/WishlistHeader';
import WishlistStats from '../components/wishlist/WishlistStats';
import WishlistFilters from '../components/wishlist/WishlistFilters';
import WishlistGrid from '../components/wishlist/WishlistGrid';
import WishlistEmpty from '../components/wishlist/WishlistEmpty';
import WishlistPagination from '../components/wishlist/WishlistPagination';
import { wishlistApi } from '../services/wishlistApi';

const Wishlist = () => {
  const { currentTheme, currentMood } = useTheme();
  const [wishlist, setWishlist] = useState(wishlistApi.getWishlist());
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter and sort wishlist
  const filteredItems = wishlist.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
      default:
        return new Date(b.added) - new Date(a.added);
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm, sortBy]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    showNotification('Removed from wishlist');
  };

  const moveToCart = (item) => {
    setWishlist(wishlist.filter(i => i.id !== item.id));
    showNotification(`Added ${item.name} to cart`);
  };

  const addToCart = (item) => {
    showNotification(`Added ${item.name} to cart`);
  };

  const moveAllToCart = () => {
    if (wishlist.length === 0) {
      showNotification('Your wishlist is empty', 'error');
      return;
    }
    setWishlist([]);
    showNotification(`Moved ${wishlist.length} items to cart`);
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlist([]);
      showNotification('Wishlist cleared');
    }
  };

  const shareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification('Wishlist link copied to clipboard');
  };

  const categories = ['all', ...new Set(wishlist.map(item => item.category))];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WishlistHeader 
          itemCount={wishlist.length}
          onClearAll={clearWishlist}
          onMoveAllToCart={moveAllToCart}
          onShare={shareWishlist}
          currentTheme={currentTheme}
        />
        
        <WishlistStats 
          wishlist={wishlist}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />
        
        <WishlistFilters 
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          currentTheme={currentTheme}
        />
        
        {wishlist.length === 0 ? (
          <WishlistEmpty currentTheme={currentTheme} currentMood={currentMood} />
        ) : (
          <>
            <WishlistGrid 
              items={currentItems}
              viewMode={viewMode}
              currentTheme={currentTheme}
              currentMood={currentMood}
              onRemove={removeFromWishlist}
              onMoveToCart={moveToCart}
              onAddToCart={addToCart}
            />
            
            <WishlistPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalItems={sortedItems.length}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentTheme={currentTheme}
            />
          </>
        )}

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
            <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;