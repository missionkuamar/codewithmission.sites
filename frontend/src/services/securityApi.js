// services/securityApi.js - Fake Security API Service
export const securityApi = {
  getAll: () => ({
    securityScore: 92,
    stats: {
      blockedAttempts: 156,
      suspiciousActivities: 3,
      vulnerabilities: 1,
      activeSessions: 3,
      totalApiKeys: 4,
      activeApiKeys: 3,
      lastBackup: '2024-02-19 23:00:00',
      nextBackup: '2024-02-20 23:00:00'
    },
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventCommonPasswords: true,
      passwordExpiryDays: 90,
      preventReuse: 5
    },
    securityLogs: [
      { id: 1, event: 'Failed Login Attempt', user: 'unknown@example.com', ip: '192.168.1.200', timestamp: '2024-02-20 09:23:45', severity: 'warning' },
      { id: 2, event: 'Password Changed', user: 'john.doe@example.com', ip: '192.168.1.100', timestamp: '2024-02-19 14:30:00', severity: 'info' },
      { id: 3, event: 'New Device Login', user: 'sarah.j@example.com', ip: '10.0.0.50', timestamp: '2024-02-19 08:15:22', severity: 'info' },
      { id: 4, event: 'Suspicious Activity Detected', user: 'unknown', ip: '203.0.113.100', timestamp: '2024-02-18 22:45:10', severity: 'critical' },
      { id: 5, event: 'API Key Generated', user: 'admin@example.com', ip: '192.168.1.100', timestamp: '2024-02-18 11:20:33', severity: 'info' }
    ]
  })
};