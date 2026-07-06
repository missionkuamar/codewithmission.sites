// components/DebugInfo.jsx
import React from 'react';

export const DebugInfo = ({ formData, thumbnail, images, zipFile }) => {
  if (process.env.NODE_ENV === 'production') return null;
  
  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-auto max-h-60">
      <details>
        <summary className="cursor-pointer text-yellow-400 font-bold">
          🔧 Debug Information (Click to expand)
        </summary>
        <div className="mt-2 space-y-1">
          <div className="text-green-400">Form Data:</div>
          <pre className="text-gray-300 whitespace-pre-wrap">
            {JSON.stringify({
              title: formData.title,
              description: formData.description?.substring(0, 50) + '...',
              price: formData.price,
              category: formData.category,
              type: formData.type,
              featured: formData.featured,
              inStock: formData.inStock,
              tags: formData.tags,
              liveDemoUrl: formData.liveDemoUrl,
              githubUrl: formData.githubUrl,
              socialLinksCount: formData.socialLinks.length,
            }, null, 2)}
          </pre>
          
          <div className="text-blue-400 mt-2">Images:</div>
          <pre className="text-gray-300">
            Thumbnail: {thumbnail ? `${thumbnail.file?.name || 'unknown'} (${thumbnail.file?.size || 0} bytes)` : 'None'}
            {'\n'}
            Images: {images.length} file(s)
            {images.map((img, i) => (
              `\n  ${i + 1}. ${img.file?.name || 'unknown'} (${img.file?.size || 0} bytes)`
            ))}
          </pre>
          
          <div className="text-purple-400 mt-2">ZIP File:</div>
          <pre className="text-gray-300">
            {zipFile ? `${zipFile.name} (${zipFile.size} bytes)` : 'None'}
          </pre>
        </div>
      </details>
    </div>
  );
};