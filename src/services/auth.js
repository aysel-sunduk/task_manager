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
  try {
    console.log('🔍 Login attempt started');
    console.log('📧 Email:', email);
    console.log('🔗 API URL:', getApiUrl(config.ENDPOINTS.LOGIN));
    console.log('📤 Request payload:', { email, password });
    
    const response = await axios.post(getApiUrl(config.ENDPOINTS.LOGIN), { email, password });
    console.log('✅ Login successful:', response.data);
    return response.data; // { token, user }
  } catch (error) {
    console.error('❌ Login failed:', error);
    console.error('❌ Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(getApiUrl(config.ENDPOINTS.REGISTER), userData);
    console.log('Register response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Google OAuth test fonksiyonu
export const testGoogleOAuth = async () => {
  try {
    console.log('🧪 Testing Google OAuth configuration...');
    console.log('🔗 Test endpoint:', getApiUrl("/api/auth/google/test"));
    
    const response = await axios.get(getApiUrl("/api/auth/google/test"));
    console.log('✅ Google OAuth test successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Google OAuth test failed:', error);
    throw error;
  }
};

// Google OAuth ile giriş/kayıt
export const googleAuth = async (idToken) => {
  try {
    console.log('🔍 Google OAuth attempt started');
    console.log('🔗 API URL:', getApiUrl("/api/auth/google"));
    console.log('📤 Request payload:', { idToken });
    console.log('📤 Token length:', idToken?.length);
    
    // Backend'in beklediği format: { idToken: "token" }
    const requestBody = { idToken };
    console.log('📤 Full request body:', requestBody);
    
    const response = await axios.post(getApiUrl("/api/auth/google"), requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('✅ Google OAuth successful:', response.data);
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', response.headers);
    
    return response.data; // { token, roleId, message, isNewUser }
  } catch (error) {
    console.error('❌ Google OAuth failed:', error);
    console.error('❌ Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config,
      url: error.config?.url,
      method: error.config?.method
    });
    
    // Daha detaylı hata mesajı
    if (error.response?.status === 404) {
      throw new Error('Google OAuth endpoint bulunamadı. Backend kontrol edin.');
    } else if (error.response?.status === 500) {
      throw new Error('Backend sunucu hatası. Google OAuth konfigürasyonunu kontrol edin.');
    } else if (error.response?.status === 400) {
      throw new Error('Geçersiz token formatı. Google OAuth token\'ı kontrol edin.');
    } else {
      throw new Error(`Google OAuth hatası: ${error.response?.data?.message || error.message}`);
    }
  }
};

// Logout endpoint - şimdilik yorum satırı olarak bırakıldı
// export const logout = async () => {
//   try {
//     const response = await fetch('/api/auth/logout', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': Bearer ${localStorage.getItem('token')}
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