// admin/dashboard/products/components/DeleteConfirmModal.jsx
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export const DeleteConfirmModal = ({ product, onConfirm, onCancel, theme }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className={`${theme.card} rounded-2xl max-w-md w-full p-6`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-full">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <h3 className="text-xl font-bold">Delete Product</h3>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-gray-700 rounded-lg transition">
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-300 mb-2">
          Are you sure you want to delete <span className="font-semibold text-white">"{product?.title}"</span>?
        </p>
        <p className="text-sm opacity-60 mb-6">
          This action cannot be undone. All associated data will be permanently removed.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};