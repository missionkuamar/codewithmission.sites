// components/FormActions.jsx
import React from 'react';
import { Loader, Check } from 'lucide-react';

export const FormActions = ({ 
  onCancel, 
  onSubmit, 
  loading, 
  uploadProgress, 
  isEditing 
}) => {
  return (
    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition flex items-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            {uploadProgress > 0 ? `${uploadProgress}%` : 'Saving...'}
          </>
        ) : (
          <>
            <Check size={18} />
            {isEditing ? 'Update Product' : 'Create Product'}
          </>
        )}
      </button>
    </div>
  );
};