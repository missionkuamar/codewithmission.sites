import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createRazorpayOrder, verifyPayment, loadRazorpayScript } from '../services/razorpay';
import api from '../services/api';

const CodeCard = ({ code }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    if (user.isPaid || user.purchasedCodes?.includes(code._id) || code.isPublic) {
      try {
        const response = await api.get(`/codes/${code._id}/download`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', code.fileName || 'code.zip');
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success('Download started!');
        return;
      } catch (error) {
        toast.error('Download failed');
        return;
      }
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Razorpay failed to load');
        return;
      }

      const orderData = await createRazorpayOrder(code._id);

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'CodeMission',
        description: `Purchase: ${code.name}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            codeId: code._id,
          };
          const result = await verifyPayment(verifyData);
          if (result.success) {
            toast.success('Payment successful! Downloading...');
            handleDownload();
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

  return (
    <div className="card p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900">{code.name}</h3>
        {code.isPublic && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Free</span>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-4">{code.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">
          {code.price === 0 ? 'Free' : `₹${code.price}`}
        </span>
        <button
          onClick={handleDownload}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            code.price === 0 || code.isPublic || user?.isPaid
              ? 'btn-primary'
              : 'btn-razorpay'
          }`}
        >
          {code.price === 0 || code.isPublic ? (
            <i className="fas fa-download mr-2"></i>
          ) : (
            <i className="fas fa-shopping-cart mr-2"></i>
          )}
          {code.price === 0 || code.isPublic ? 'Download' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default CodeCard;