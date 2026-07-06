// services/authApi.js
export const authApi = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password123') {
          resolve({ success: true, message: 'Login successful!' });
        } else {
          reject({ success: false, message: 'Invalid email or password' });
        }
      }, 1500);
    });
  },

  forgotPassword: (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Password reset link sent to your email!' });
      }, 1500);
    });
  },

  verify2FA: (code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: '2FA verification successful!' });
      }, 1500);
    });
  },

  socialLogin: (provider) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `Login with ${provider} successful!` });
      }, 1000);
    });
  }
};