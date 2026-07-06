// pages/MyPurchases.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPurchases } from '../redux/slices/productSlice';
import { useTheme } from '../context/ThemeContext';
import { Package, Download, ExternalLink, Calendar, DollarSign } from 'lucide-react';

const MyPurchases = () => {
  const dispatch = useDispatch();
  const { currentTheme } = useTheme();
  const { purchases, loading } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(getUserPurchases());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Package size={32} /> My Purchases
        </h1>

        {purchases?.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl opacity-75">No purchases yet</p>
            <p className="opacity-50">Start exploring and buying products!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {purchases.map((purchase) => (
              <div key={purchase._id} className={`${currentTheme.card} p-6 rounded-xl`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{purchase.product?.title}</h3>
                    <p className="opacity-75 text-sm mt-1">{purchase.product?.description}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign size={16} className="text-purple-500" />
                        ${purchase.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(purchase.purchasedAt).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        purchase.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        purchase.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {purchase.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {purchase.product?.zipFile?.url && (
                      <a
                        href={purchase.product.zipFile.url}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:scale-105 transition"
                      >
                        <Download size={16} /> Download ZIP
                      </a>
                    )}
                    {purchase.product?.liveDemoUrl && (
                      <a
                        href={purchase.product.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;