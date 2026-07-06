// components/support/LiveChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Circle, Phone, Video, Smile, Paperclip } from 'lucide-react';

const LiveChat = ({ currentTheme, currentMood, showNotification }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to Support Chat. How can I help you today?", sender: "agent", time: "10:30 AM" },
    { id: 2, text: "Hi, I need help with my order.", sender: "user", time: "10:31 AM" },
    { id: 3, text: "I'd be happy to help! Can you please provide your order number?", sender: "agent", time: "10:32 AM" }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentOnline, setAgentOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
    
    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Thank you for your message. One of our agents will assist you shortly.",
        sender: "agent",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className={`${currentTheme.secondary} p-4 rounded-t-lg flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <User size={24} className="text-purple-500" />
            {agentOnline && <Circle size={10} className="absolute bottom-0 right-0 text-green-500 fill-green-500" />}
          </div>
          <div>
            <h3 className="font-semibold">Support Agent</h3>
            <p className="text-xs opacity-75">{agentOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Video size={18} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${currentTheme.secondary}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : `${currentTheme.card} border ${currentTheme.border}`
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-60 mt-1">{message.time}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`${currentTheme.card} p-3 rounded-lg`}>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className={`${currentTheme.secondary} p-4 rounded-b-lg border-t ${currentTheme.border}`}>
        <div className="flex gap-2 items-end">
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Paperclip size={18} />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows="1"
            className={`flex-1 px-4 py-2 rounded-lg ${currentTheme.card} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
          />
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Smile size={18} />
          </button>
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs opacity-60 mt-2 text-center">
          Our support team typically replies within 2 minutes
        </p>
      </div>
    </div>
  );
};

export default LiveChat;