// components/support/TicketSystem.jsx
import React, { useState } from 'react';
import { Plus, Ticket, Clock, CheckCircle, AlertCircle, MessageCircle, Eye } from 'lucide-react';

const TicketSystem = ({ currentTheme, currentMood, showNotification }) => {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [tickets, setTickets] = useState([
    { id: 'TKT-001', subject: 'Payment Issue', status: 'resolved', priority: 'high', date: '2024-02-18', lastUpdate: '2024-02-19' },
    { id: 'TKT-002', subject: 'Product Not Working', status: 'in-progress', priority: 'urgent', date: '2024-02-19', lastUpdate: '2024-02-20' },
    { id: 'TKT-003', subject: 'Shipping Delay', status: 'pending', priority: 'medium', date: '2024-02-20', lastUpdate: '2024-02-20' }
  ]);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-green-500/20 text-green-500';
      case 'in-progress': return 'bg-blue-500/20 text-blue-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      default: return 'bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500/20 text-red-500';
      case 'high': return 'bg-orange-500/20 text-orange-500';
      case 'medium': return 'bg-blue-500/20 text-blue-500';
      case 'low': return 'bg-green-500/20 text-green-500';
      default: return 'bg-gray-500/20';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      ...newTicket,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0]
    };
    setTickets([ticket, ...tickets]);
    setShowTicketForm(false);
    setNewTicket({ subject: '', category: '', priority: 'medium', description: '' });
    showNotification('Ticket created successfully! We\'ll respond within 24 hours.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Support Tickets</h2>
        <button
          onClick={() => setShowTicketForm(!showTicketForm)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> New Ticket
        </button>
      </div>

      {showTicketForm && (
        <div className={`${currentTheme.secondary} p-6 rounded-lg`}>
          <h3 className="font-semibold mb-4">Create New Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Subject *</label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
                required
              >
                <option value="">Select Category</option>
                <option value="payment">Payment Issue</option>
                <option value="technical">Technical Problem</option>
                <option value="shipping">Shipping Question</option>
                <option value="product">Product Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Priority</label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                rows="4"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowTicketForm(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="p-3">Ticket ID</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Created</th>
              <th className="p-3">Last Update</th>
              <th className="p-3">Actions</th>
             </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="p-3 font-mono text-sm">{ticket.id}</td>
                <td className="p-3">{ticket.subject}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-3 text-sm">{ticket.date}</td>
                <td className="p-3 text-sm">{ticket.lastUpdate}</td>
                <td className="p-3">
                  <button className="p-1 hover:text-blue-500 transition-colors">
                    <Eye size={18} />
                  </button>
                </td>
               </tr>
            ))}
          </tbody>
         </table>
      </div>
    </div>
  );
};

export default TicketSystem;