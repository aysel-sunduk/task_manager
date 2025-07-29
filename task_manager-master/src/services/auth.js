import axios from "axios";
import { config, getApiUrl } from "../config";

// Axios interceptor for adding JWT token to requests
axios.interceptors.request.use(
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

// Axios interceptor for handling token expiration
axios.interceptors.response.use(
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

export const login = async (email, password) => {
  const response = await axios.post(getApiUrl(config.ENDPOINTS.LOGIN), { email, password });
  return response.data; // { token, user }
};

export const register = async (userData) => {
  const response = await axios.post(getApiUrl(config.ENDPOINTS.REGISTER), userData);
  return response.data;
};

// Logout endpoint - şimdilik yorum satırı olarak bırakıldı
// export const logout = async () => {
//   try {
//     const response = await fetch('/api/auth/logout', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     
//     if (response.ok) {
//       return { success: true };
//     } else {
//       throw new Error('Logout failed');
//     }
//   } catch (error) {
//     console.error('Logout error:', error);
//     throw error;
//   }
// };

// Şimdilik basit bir logout fonksiyonu
export const logout = async () => {
  // Simüle edilmiş API çağrısı
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

// Not: Eğer kullanıcı URL'de manuel olarak / ile değişiklik yaparsa, logout işlemini tetiklemek için
// üst seviye bir bileşende (örn. App.js veya AuthProvider içinde) window.location.pathname değişimini izleyip
// yetkisiz erişim tespit edildiğinde logout fonksiyonu çağrılabilir.
