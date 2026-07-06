import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Receipt
} from 'lucide-react';

const TransactionHistory = ({ transactions = [], currentTheme, currentMood }) => {

  const [downloadingId, setDownloadingId] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'failed':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20';
    }
  };

  // 📥 Download simulation (replace with real API)
  const downloadInvoice = async (id) => {
    setDownloadingId(id);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  if (!transactions.length) {
    return (
      <div className={`${currentTheme.card} ${currentMood} p-12 text-center`}>
        <Receipt size={48} className="mx-auto opacity-30 mb-3" />
        <p className="opacity-75">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h2 className="text-xl font-bold">Transaction History</h2>

      {/* TABLE */}
      <div className={`${currentTheme.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* HEAD */}
            <thead className="border-b border-gray-700">
              <tr className="text-left">
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {transactions.map((tx) => {

                const amount = Number(tx.amount ?? 0);
                const isCredit = amount < 0;

                return (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-700 hover:bg-gray-800/50 transition"
                  >

                    {/* ID */}
                    <td className="p-3 font-mono text-sm">
                      {tx.id}
                    </td>

                    {/* DATE */}
                    <td className="p-3 text-sm">
                      {tx.date
                        ? new Date(tx.date).toLocaleDateString()
                        : '—'}
                    </td>

                    {/* DESC */}
                    <td className="p-3">
                      {tx.description ?? '—'}
                    </td>

                    {/* AMOUNT */}
                    <td className="p-3">
                      <span className={`font-semibold ${
                        isCredit ? 'text-green-500' : 'text-purple-500'
                      }`}>
                        {isCredit ? '+' : '-'} ₹{Math.abs(amount).toFixed(2)}
                      </span>
                    </td>

                    {/* METHOD */}
                    <td className="p-3 text-sm">
                      {tx.paymentMethod ?? '—'}
                    </td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${getStatusColor(tx.status)}`}>
                        {getStatusIcon(tx.status)}
                        {tx.status?.charAt(0).toUpperCase() + tx.status?.slice(1)}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="p-3">
                      <button
                        onClick={() => downloadInvoice(tx.id)}
                        className="p-1 hover:text-blue-500 transition"
                        disabled={downloadingId === tx.id}
                      >
                        {downloadingId === tx.id
                          ? <Clock size={16} className="animate-spin" />
                          : <Download size={16} />
                        }
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;