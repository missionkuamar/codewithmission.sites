// components/product/ProductGallery.jsx
import React from 'react';

const ProductGallery = ({ product, selectedImage, setSelectedImage, currentTheme, currentMood }) => {
  return (
    <div className="space-y-4">
      <div className={`${currentTheme.card} ${currentMood} rounded-xl overflow-hidden`}>
        <img
          src={product.images?.[selectedImage] || product.image}
          alt={product.title}
          className="w-full h-96 object-cover"
        />
      </div>
      {product.images && product.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index ? 'border-purple-500' : 'border-transparent'
              }`}
            >
              <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;