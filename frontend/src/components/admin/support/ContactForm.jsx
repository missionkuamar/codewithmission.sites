// components/support/ContactForm.jsx
import React, { useState } from 'react';
import { Send, Mail, User, Phone, MessageCircle } from 'lucide-react';

const ContactForm = ({ currentTheme, currentMood, showNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNotification('Message sent successfully! We\'ll respond within 24 hours.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: "Email", value: "support@example.com", action: "support@example.com" },
    { icon: <Phone size={20} />, title: "Phone", value: "+1 (555) 123-4567", action: "Call Now" },
    { icon: <MessageCircle size={20} />, title: "Live Chat", value: "Available 24/7", action: "Start Chat" }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Send us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Your Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
            Send Message
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-4 mb-6">
          {contactInfo.map((info, index) => (
            <div key={index} className={`${currentTheme.secondary} p-4 rounded-lg flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm opacity-75">{info.title}</p>
                  <p className="font-semibold">{info.value}</p>
                </div>
              </div>
              <button className="text-purple-500 hover:text-purple-400 text-sm">
                {info.action}
              </button>
            </div>
          ))}
        </div>

        <div className={`${currentTheme.secondary} p-4 rounded-lg`}>
          <h3 className="font-semibold mb-2">Business Hours</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM EST</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM EST</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;