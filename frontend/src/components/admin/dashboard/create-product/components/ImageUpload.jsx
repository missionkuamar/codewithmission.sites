// components/ImageUpload.jsx
import React from 'react';
import { CloudUpload, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const ImageUpload = ({ 
  label, 
  accept, 
  multiple, 
  onChange, 
  previews, 
  onRemove,
  maxSize,
  helperText 
}) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (maxSize) {
      const oversized = files.some(file => file.size > maxSize);
      if (oversized) {
        toast.error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
        return;
      }
    }
    
    onChange(e);
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className={`relative border-2 border-dashed rounded-lg p-4 border-gray-600 hover:border-purple-500 transition`}>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="text-center">
          <CloudUpload className="mx-auto mb-2" size={32} />
          <p className="text-sm">Click or drag to upload</p>
          {helperText && <p className="text-xs opacity-60">{helperText}</p>}
        </div>
      </div>
      
      {previews && previews.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img 
                src={preview.url} 
                alt={`Preview ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg"
              />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};  