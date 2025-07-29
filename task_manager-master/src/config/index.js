// Environment configuration
export const config = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  
  // JWT Configuration
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET || "default-secret-key",
  
  // Environment
  ENV: process.env.REACT_APP_ENV || "development",
  
  // Feature flags
  ENABLE_TOKEN_VALIDATION: process.env.REACT_APP_ENABLE_TOKEN_VALIDATION !== "false",
  ENABLE_LOGGING: process.env.REACT_APP_ENABLE_LOGGING === "true",
  
  // Development mode settings
  SKIP_TOKEN_VALIDATION_IN_DEV: process.env.REACT_APP_SKIP_TOKEN_VALIDATION_IN_DEV === "true" || true,
  
  // API Endpoints
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/signup",
    VALIDATE_TOKEN: "/api/auth/validate",
    LOGOUT: "/api/auth/logout",
  },
  
  // App Configuration
  APP_NAME: "Task Manager",
  VERSION: "1.0.0",
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${config.API_URL}${endpoint}`;
};

// Helper function to check if we're in development mode
export const isDevelopment = () => {
  return config.ENV === "development";
}; 