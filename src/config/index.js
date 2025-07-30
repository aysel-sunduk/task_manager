// Environment configuration
export const config = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || "http://192.168.234.28:8080",
  
  // JWT Configuration
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET || "default-secret-key",
  
  // Google OAuth Configuration
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com",
  
  // Environment
  ENV: process.env.REACT_APP_ENV || "development",
  
  // Feature flags
  ENABLE_TOKEN_VALIDATION: process.env.REACT_APP_ENABLE_TOKEN_VALIDATION !== "false",
  ENABLE_LOGGING: true, // Logging'i aktif et
  
  // API Endpoints - Backend'e uygun olarak güncellendi
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/signup",
    GOOGLE_AUTH: "/api/auth/google",
    GOOGLE_TEST: "/api/auth/google/test",
    // VALIDATE_TOKEN: "/api/auth/validate", // Backend'de yok
    LOGOUT: "/api/auth/logout",
    // Admin endpoints
    ADMIN_DASHBOARD: "/api/admin/dashboard",
    ADMIN_WORKSPACES: "/api/admin/workspaces",
    ADMIN_WORKSPACES_COUNT: "/api/admin/workspaces/count",
    ADMIN_USERS_ACTIVE_COUNT: "/api/admin/users/active/count",
    // Workspace endpoints
    WORKSPACES: "/api/workspaces",
    WORKSPACES_MEMBER: "/api/workspaces/member",
  },
  
  // App Configuration
  APP_NAME: "Task Manager",
  VERSION: "1.0.0",
};

export const getApiUrl = (endpoint) => {
  const fullUrl = `${config.API_URL}${endpoint}`; 
  console.log('API URL:', fullUrl);
  return fullUrl;
};

// Helper function to check if we're in development mode
export const isDevelopment = () => {
  return config.ENV === "development";
};

// Debug function to test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${config.API_URL}/api/auth/google/test`);
    console.log('Backend connection test:', response.status, response.ok);
    return response.ok;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
};

// Test all available endpoints
export const testAllEndpoints = async () => {
  const endpoints = [
    { path: '/api/auth/login', method: 'POST' },
    { path: '/api/auth/signup', method: 'POST' },
    { path: '/api/auth/google/test', method: 'GET' },
    { path: '/api/admin/dashboard', method: 'GET' },
    { path: '/api/admin/workspaces/count', method: 'GET' },
    { path: '/api/admin/users/active/count', method: 'GET' },
    { path: '/api/admin/workspaces', method: 'GET' }
  ];
  
  console.log('Testing all endpoints...');
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${config.API_URL}${endpoint.path}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json'
        },
        ...(endpoint.method === 'POST' && {
          body: JSON.stringify({
            email: 'test@test.com',
            password: 'test123'
          })
        })
      });
      console.log(`${endpoint.path} (${endpoint.method}): ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`${endpoint.path} (${endpoint.method}): ERROR - ${error.message}`);
    }
  }
};