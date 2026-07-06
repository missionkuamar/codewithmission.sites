// services/settingsApi.js - Fake Settings API Service
export const settingsApi = {
  getGeneralSettings: () => ({
    siteName: 'Portfolio Pro',
    siteTagline: 'Premium Digital Solutions',
    siteEmail: 'admin@portfoliopro.com',
    sitePhone: '+1 (555) 123-4567',
    siteAddress: '123 Tech Street, San Francisco, CA 94105',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    language: 'en'
  }),

  getAppearanceSettings: () => ({
    theme: 'midnightProfessional',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    fontFamily: 'Inter',
    borderRadius: '0.5rem',
    animationEnabled: true,
    darkModeEnabled: true,
    compactMode: false
  }),

  getEmailSettings: () => ({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'admin@portfoliopro.com',
    smtpPassword: '********',
    fromEmail: 'noreply@portfoliopro.com',
    fromName: 'Portfolio Pro',
    enableNotifications: true,
    welcomeEmail: true,
    orderConfirmation: true,
    passwordReset: true,
    newsletterEnabled: true
  }),

  getPaymentSettings: () => ({
    currency: 'USD',
    currencySymbol: '$',
    stripeEnabled: true,
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalEnabled: true,
    paypalClientId: 'AYx...',
    paypalSecret: 'ELx...',
    razorpayEnabled: false,
    razorpayKey: '',
    razorpaySecret: '',
    taxRate: 10,
    shippingCost: 9.99,
    freeShippingThreshold: 100,
    enableCoupons: true
  }),

  getSecuritySettings: () => ({
    twoFactorAuth: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    requireStrongPassword: true,
    ipWhitelist: '',
    enableCaptcha: true,
    captchaKey: '6LeIxAcTAAAA...',
    backupEnabled: true,
    backupFrequency: 'daily'
  }),

  getSocialSettings: () => ({
    facebook: 'https://facebook.com/portfoliopro',
    twitter: 'https://twitter.com/portfoliopro',
    instagram: 'https://instagram.com/portfoliopro',
    youtube: 'https://youtube.com/portfoliopro',
    github: 'https://github.com/portfoliopro',
    linkedin: 'https://linkedin.com/company/portfoliopro',
    discord: 'https://discord.gg/portfoliopro',
    threads: 'https://threads.net/portfoliopro'
  }),

  getSeoSettings: () => ({
    metaTitle: 'Portfolio Pro - Premium Digital Solutions',
    metaDescription: 'Professional portfolio and digital solutions provider',
    metaKeywords: 'portfolio, web development, digital solutions, freelance',
    googleAnalytics: 'UA-XXXXX-X',
    googleTagManager: 'GTM-XXXXX',
    enableSitemap: true,
    enableRobots: true,
    robotsTxt: 'User-agent: *\nAllow: /',
    canonicalUrl: 'https://portfoliopro.com'
  }),

  getNotificationSettings: () => ({
    emailNotifications: true,
    pushNotifications: true,
    orderAlerts: true,
    userSignupAlerts: true,
    commentAlerts: true,
    dailyDigest: true,
    weeklyReport: true,
    marketingEmails: false
  }),
   getUser: () => ({
    id: 1001,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/Los_Angeles',
    language: 'English',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD'
  }),

  getNotificationPrefs: () => ({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    securityAlerts: true,
    productUpdates: false
  }),

  getPrivacySettings: () => ({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showActivity: true,
    allowMessages: true,
    dataSharing: false,
    analyticsConsent: true
  }),

  getAppearancePrefs: () => ({
    theme: 'dark',
    fontSize: 'medium',
    compactView: false,
    animations: true,
    reducedMotion: false
  })
};

