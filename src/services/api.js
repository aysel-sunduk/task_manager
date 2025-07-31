import axios from 'axios';

// Environment variables
const API_URL = process.env.REACT_APP_API_URL || "http://192.168.234.28:8080";
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET || "default-secret-key";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com";
const ENV = process.env.REACT_APP_ENV || "development";
const ENABLE_TOKEN_VALIDATION = process.env.REACT_APP_ENABLE_TOKEN_VALIDATION !== "false";
const ENABLE_LOGGING = true;

// API Endpoints
export const ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/signup",
  GOOGLE_AUTH: "/api/auth/google",
  GOOGLE_TEST: "/api/auth/google/test",
  LOGOUT: "/api/auth/logout",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  
  // Admin endpoints
  ADMIN_DASHBOARD: "/api/admin/dashboard",
  ADMIN_WORKSPACES: "/api/admin/workspaces",
  ADMIN_WORKSPACES_COUNT: "/api/admin/workspaces/count",
  ADMIN_USERS_ACTIVE_COUNT: "/api/admin/users/active/count",
  ADMIN_LOGS: "/api/admin/logs",
  
  // Workspace endpoints
  WORKSPACES: "/api/workspaces",
  WORKSPACES_MEMBER: "/api/workspaces/member",
  WORKSPACE_MEMBERS: "/api/workspace-members",
  
  // Board endpoints
  BOARDS: "/api/boards",
  
  // List endpoints
  LISTS: "/api/lists",
  
  // Card endpoints
  CARDS: "/api/cards",
  
  // User endpoints
  USERS: "/api/users",
  
  // Activity endpoints
  ACTIVITIES: "/api/activities",
  
  // Notification endpoints
  NOTIFICATIONS: "/api/notifications",
  
  // Role endpoints
  ROLES: "/api/roles",
};

// Configuration object
export const config = {
  API_URL,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  ENV,
  ENABLE_TOKEN_VALIDATION,
  ENABLE_LOGGING,
  ENDPOINTS,
  APP_NAME: "Task Manager",
  VERSION: "1.0.0",
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  const fullUrl = `${config.API_URL}${endpoint}`;
  if (config.ENABLE_LOGGING) {
    console.log('API URL:', fullUrl);
  }
  return fullUrl;
};

// Helper function to check if we're in development mode
export const isDevelopment = () => {
  return config.ENV === "development";
};

// Axios instance with default configuration
const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    if (config.ENABLE_LOGGING) {
      console.log('API Response:', response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    if (config.ENABLE_LOGGING) {
      console.error('API Error:', error.config?.url, error.response?.status, error.message);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Export apiClient for use in other services
// Debug function to test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.GOOGLE_TEST);
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
    { path: ENDPOINTS.LOGIN, method: 'POST' },
    { path: ENDPOINTS.REGISTER, method: 'POST' },
    { path: ENDPOINTS.GOOGLE_TEST, method: 'GET' },
    { path: ENDPOINTS.ADMIN_DASHBOARD, method: 'GET' },
    { path: ENDPOINTS.ADMIN_WORKSPACES_COUNT, method: 'GET' },
    { path: ENDPOINTS.ADMIN_USERS_ACTIVE_COUNT, method: 'GET' },
    { path: ENDPOINTS.ADMIN_WORKSPACES, method: 'GET' }
  ];
  
  console.log('Testing all endpoints...');
  
  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.request({
        url: endpoint.path,
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json'
        },
        ...(endpoint.method === 'POST' && {
          data: {
            email: 'test@test.com',
            password: 'test123'
          }
        })
      });
      console.log(`${endpoint.path} (${endpoint.method}): ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`${endpoint.path} (${endpoint.method}): ERROR - ${error.message}`);
    }
  }
};

export default apiClient; 