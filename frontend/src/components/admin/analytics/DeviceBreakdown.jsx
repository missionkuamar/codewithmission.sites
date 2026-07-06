// components/admin/analytics/DeviceBreakdown.jsx
import React from 'react';
import { Monitor, Smartphone, Tablet, TrendingUp, TrendingDown } from 'lucide-react';

const DeviceBreakdown = ({ devices, currentTheme, currentMood }) => {
  const deviceData = [
    { name: "Desktop", icon: <Monitor size={24} />, percentage: devices.desktop, growth: devices.desktopGrowth, color: "from-blue-500 to-cyan-500" },
    { name: "Mobile", icon: <Smartphone size={24} />, percentage: devices.mobile, growth: devices.mobileGrowth, color: "from-green-500 to-emerald-500" },
    { name: "Tablet", icon: <Tablet size={24} />, percentage: devices.tablet, growth: devices.tabletGrowth, color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className={`${currentTheme.card} ${currentMood} p-6`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Monitor size={20} /> Device Breakdown
      </h3>
      <div className="space-y-4">
        {deviceData.map((device, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {device.icon}
              <span className="font-semibold">{device.name}</span>
              <span className="text-2xl font-bold">{device.percentage}%</span>
              <span className={`text-xs flex items-center gap-1 ${device.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {device.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(device.growth)}%
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${device.color} rounded-full`}
                style={{ width: `${device.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceBreakdown;