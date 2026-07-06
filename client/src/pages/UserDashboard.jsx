import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../services/api';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [purchasedProjects, setPurchasedProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPurchasedProjects();
    fetchOrders();
  }, []);

  const fetchPurchasedProjects = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/users/purchased-projects');
      setPurchasedProjects(data.projects);
    } catch (error) {
      toast.error('Failed to fetch purchased projects');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/my-orders');
      setOrders(data.orders);
    } catch (error) {
     // console.error('Failed to fetch orders');
    }
  };

  const handleDownload = async (projectId) => {
    try {
      const { data } = await api.get(`/projects/${projectId}/download`);
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
        toast.success('Download started!');
      }
    } catch (error) {
      toast.error('Download failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>

      {/* Purchased Projects */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedProjects.map((project) => (
            <div key={project._id} className="card p-6">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Downloaded {project.downloads} times
                </span>
                <button
                  onClick={() => handleDownload(project._id)}
                  className="btn-primary px-4 py-2 rounded-lg text-sm"
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          ))}
          {purchasedProjects.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center py-8">
              No purchased projects yet. Browse the marketplace!
            </p>
          )}
        </div>
      </div>

      {/* Order History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {order.items.map((item, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded text-sm">
                        {item.title} - ${item.price}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.totalAmount}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No orders yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;