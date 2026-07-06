// pages/ProductDetail.jsx - Main Product Detail Page (Refactored)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ProductBreadcrumb from '../components/product/ProductBreadcrumb';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductSkeleton from '../components/product/ProductSkeleton';
import ProductNotFound from '../components/product/ProductNotFound';
import Notification from '../components/common/Notification';
import { productsApi } from '../services/productsApi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTheme, currentMood } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const loadProduct = () => {
    setLoading(true);
    setTimeout(() => {
      const foundProduct = productsApi.getProductById(parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(productsApi.getRelatedProducts(parseInt(id)));
      }
      setLoading(false);
    }, 500);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = () => {
    showNotification(`Added ${quantity} ${product?.title} to cart`);
  };

  const buyNow = () => {
    showNotification('Redirecting to checkout...');
    setTimeout(() => navigate('/checkout'), 1000);
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    showNotification(wishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification('Product link copied to clipboard');
  };

  if (loading) {
    return <ProductSkeleton currentTheme={currentTheme} />;
  }

  if (!product) {
    return <ProductNotFound navigate={navigate} currentTheme={currentTheme} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductBreadcrumb 
          productTitle={product.title} 
          navigate={navigate} 
          currentTheme={currentTheme} 
        />
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductGallery 
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
          
          <ProductInfo 
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            wishlist={wishlist}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
            onToggleWishlist={toggleWishlist}
            onShare={shareProduct}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
        </div>

        <ProductTabs 
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />

        {relatedProducts.length > 0 && (
          <RelatedProducts 
            products={relatedProducts}
            navigate={navigate}
            currentTheme={currentTheme}
            currentMood={currentMood}
          />
        )}
      </div>

      <Notification 
        notification={notification}
        setNotification={setNotification}
      />
    </div>
  );
};

export default ProductDetail;