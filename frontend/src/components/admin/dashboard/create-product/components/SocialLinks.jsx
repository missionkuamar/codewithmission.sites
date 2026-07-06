// components/SocialLinks.jsx
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from 'lucide-react';

const PLATFORMS = [
  { value: 'github', label: 'GitHub', icon: <FaGithub size={16} /> },
  { value: 'live-demo', label: 'Live Demo', icon: <ExternalLink size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: '▶️' },
  { value: 'instagram', label: 'Instagram', icon: '📸' },
  { value: 'twitter', label: 'Twitter', icon: '🐦' },
  { value: 'facebook', label: 'Facebook', icon: '📘' },
  { value: 'linkedin', label: 'LinkedIn', icon: '💼' }
];

export const SocialLinks = ({ links, onAdd, onRemove, theme }) => {
  const [socialLink, setSocialLink] = useState({ platform: 'github', url: '', label: '' });

  const handleAdd = () => {
    if (onAdd(socialLink)) {
      setSocialLink({ platform: 'github', url: '', label: '' });
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Social Links</label>
      <div className="flex gap-2 mb-2">
        <select
          value={socialLink.platform}
          onChange={(e) => setSocialLink({...socialLink, platform: e.target.value})}
          className={`flex-1 px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border}`}
        >
          {PLATFORMS.map(p => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <input
          type="url"
          value={socialLink.url}
          onChange={(e) => setSocialLink({...socialLink, url: e.target.value})}
          className={`flex-1 px-3 py-2 rounded-lg ${theme.secondary} border ${theme.border}`}
          placeholder="https://..."
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          <Plus size={18} />
        </button>
      </div>

      {links.length > 0 && (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {links.map((link, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-lg">
              <span className="text-sm truncate flex-1">
                <span className="font-semibold text-purple-400">
                  {PLATFORMS.find(p => p.value === link.platform)?.label || link.platform}:
                </span>
                {' '}{link.url}
              </span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};