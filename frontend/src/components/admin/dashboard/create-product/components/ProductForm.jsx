// components/ProductForm.jsx
import React from 'react';
import { useProductForm } from '../hooks/useProductForm';
import { FormFields } from './FormFields';
import { ImageUpload } from './ImageUpload';
import { SocialLinks } from './SocialLinks';
import { FormActions } from './FormActions';
import { FileArchive } from 'lucide-react';

const ProductForm = ({ product, onClose, currentTheme, onSave }) => { // Added onSave prop
  const {
    formData,
    handleChange,
    thumbnail,
    handleThumbnailUpload,
    images,
    handleImageUpload,
    removeImage,
    zipFile,
    handleZipUpload,
    addSocialLink,
    removeSocialLink,
    handleSubmit,
    loading,
    uploadProgress,
    isEditing
  } = useProductForm(product, onClose, onSave); // Pass onSave to hook

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <FormFields 
            formData={formData} 
            handleChange={handleChange} 
            theme={currentTheme} 
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Thumbnail Upload */}
          <ImageUpload
            label="Thumbnail Image *"
            accept="image/*"
            multiple={false}
            onChange={handleThumbnailUpload}
            previews={thumbnail ? [thumbnail] : []}
            onRemove={() => {}}
            helperText="Recommended: 800x600px"
          />

          {/* Product Images */}
          <ImageUpload
            label="Product Images *"
            accept="image/*"
            multiple={true}
            onChange={handleImageUpload}
            previews={images}
            onRemove={removeImage}
            helperText="JPG, PNG, WebP up to 10MB"
          />

          {/* ZIP File Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">ZIP File (Optional)</label>
            <div className={`relative border-2 border-dashed rounded-lg p-4 ${currentTheme.border} hover:border-purple-500 transition`}>
              <input
                type="file"
                accept=".zip,.rar,.7z"
                onChange={handleZipUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <FileArchive className="mx-auto mb-2" size={32} />
                <p className="text-sm">Upload project ZIP file</p>
                <p className="text-xs opacity-60">Max 50MB</p>
              </div>
            </div>
            {zipFile && (
              <p className="text-xs text-green-500 mt-1">
                ✓ {zipFile.name} ({(zipFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Social Links */}
          <SocialLinks
            links={formData.socialLinks}
            onAdd={addSocialLink}
            onRemove={removeSocialLink}
            theme={currentTheme}
          />

          {/* Checkboxes */}
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Featured Product</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">In Stock</span>
            </label>
          </div>
        </div>
      </div>

      <FormActions
        onCancel={onClose}
        loading={loading}
        uploadProgress={uploadProgress}
        isEditing={isEditing}
      />
    </form>
  );
};

export default ProductForm;