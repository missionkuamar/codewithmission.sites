import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

const ApiKeys = ({ currentTheme }) => {

  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'pk_live_abc123def456xyz789',
      createdAt: '2024-01-15',
      lastUsed: '2024-02-20',
      active: true
    }
  ]);

  const [showKey, setShowKey] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // 🔐 Secure Key Generator
  const generateSecureKey = () => {
    return 'pk_' + crypto.randomUUID().replace(/-/g, '').slice(0, 32);
  };

  // ➕ Create Key
  const generateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: `API Key ${apiKeys.length + 1}`,
      key: generateSecureKey(),
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      active: true
    };

    setApiKeys(prev => [newKey, ...prev]);
  };

  // ❌ Revoke Key
  const revokeApiKey = (id) => {
    setApiKeys(prev =>
      prev.map(k => k.id === id ? { ...k, active: false } : k)
    );
  };

  // 📋 Copy Key
  const copyToClipboard = (key, id) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);

    setTimeout(() => setCopiedId(null), 2000);
  };

  // 👁 Toggle Visibility
  const toggleShowKey = (id) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 🔒 Mask Key
  const maskKey = (key) => {
    return key.slice(0, 6) + '••••••••••••' + key.slice(-4);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">API Keys</h2>

        <button
          onClick={generateApiKey}
          className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <Plus size={18} />
          Generate Key
        </button>
      </div>

      {/* TABLE */}
      <div className={`${currentTheme.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* HEAD */}
            <thead className="border-b border-gray-700">
              <tr className="text-left">
                <th className="p-3">Name</th>
                <th className="p-3">API Key</th>
                <th className="p-3">Created</th>
                <th className="p-3">Last Used</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {apiKeys.map((key) => (
                <tr
                  key={key.id}
                  className="border-b border-gray-700 hover:bg-gray-800/40 transition"
                >

                  {/* NAME */}
                  <td className="p-3">{key.name}</td>

                  {/* KEY */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">

                      <code className="font-mono text-sm bg-gray-800 px-2 py-1 rounded">
                        {showKey[key.id] ? key.key : maskKey(key.key)}
                      </code>

                      {/* SHOW / HIDE */}
                      <button
                        onClick={() => toggleShowKey(key.id)}
                        className="p-1 hover:text-blue-500"
                      >
                        {showKey[key.id]
                          ? <EyeOff size={14} />
                          : <Eye size={14} />
                        }
                      </button>

                      {/* COPY */}
                      <button
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="p-1 hover:text-green-500"
                      >
                        {copiedId === key.id
                          ? <Check size={14} />
                          : <Copy size={14} />
                        }
                      </button>

                    </div>
                  </td>

                  {/* CREATED */}
                  <td className="p-3 text-sm">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </td>

                  {/* LAST USED */}
                  <td className="p-3 text-sm">
                    {key.lastUsed}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      key.active
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {key.active ? 'Active' : 'Revoked'}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    {key.active && (
                      <button
                        onClick={() => revokeApiKey(key.id)}
                        className="p-1 hover:text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;