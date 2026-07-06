// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../services/api';
import { loadRazorpayScript, createRazorpayOrder, verifyPayment } from '../services/razorpay';

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasedIds, setPurchasedIds] = useState([]);

  useEffect(() => {
    fetchProjects();
    if (isAuthenticated) {
      fetchPurchasedProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects/public');
      setProjects(data.projects);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchasedProjects = async () => {
    try {
      const { data } = await api.get('/projects/my-purchased');
      setPurchasedIds(data.projects.map(p => p._id));
    } catch (error) {
      console.error('Failed to fetch purchased projects');
    }
  };

  const handlePurchase = async (project) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }

    if (project.isPublic) {
      handleDownload(project);
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Razorpay failed to load');
        return;
      }

      const orderData = await createRazorpayOrder(project._id);

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'CodeMission',
        description: `Purchase: ${project.title}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            projectId: project._id,
          };
          const result = await verifyPayment(verifyData);
          if (result.success) {
            toast.success('Payment successful!');
            handleDownload(project);
            fetchPurchasedProjects();
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#0d9488',
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Payment failed: ' + error.message);
    }
  };

  const handleDownload = async (project) => {
    try {
      const { data } = await api.get(`/projects/${project._id}/download`);
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
        toast.success('Download started!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Download failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects Marketplace</h1>
        <p className="text-gray-600 mt-2">Discover and purchase amazing projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const isPurchased = purchasedIds.includes(project._id);
          const isFree = project.isPublic || project.price === 0;

          return (
            <div key={project._id} className="card p-6 hover:shadow-lg transition">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                {project.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags?.slice(0, 3).map((tag, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    {isFree ? 'Free' : `$${project.price}`}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {project.downloads} downloads
                  </span>
                </div>
                <button
                  onClick={() => handlePurchase(project)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isPurchased || isFree
                      ? 'btn-primary'
                      : 'btn-razorpay'
                  }`}
                  disabled={isPurchased && !isFree}
                >
                  {isPurchased ? 'Download' : isFree ? 'Download' : 'Buy Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects available yet.</p>
        </div>
      )}
    </div>
  );
};

export default Home;