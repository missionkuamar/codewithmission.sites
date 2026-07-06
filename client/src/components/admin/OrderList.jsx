import React from 'react';

const OrderList = ({ orders, onRefresh }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Orders ({orders.length})</h2>
        <button
          onClick={onRefresh}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="card p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-semibold">Order #{order._id.slice(-6)}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>User:</strong> {order.user?.name || 'N/A'} ({order.user?.email})
                </p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Items:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {order.items?.map((item, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded text-sm">
                        {item.title || item.project?.title} - ${item.price}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <span>💰 Total: ${order.totalAmount}</span>
                  <span>📅 {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {order.downloadHistory?.length > 0 && (
                  <span className="text-xs text-gray-500">
                    ⬇️ Downloaded {order.downloadHistory.length} times
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;