import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  return response.data; // { token, user }
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
  return response.data;
};

/**
 * Google ile giriş: Google access token'ı backend'e gönderir, backend doğrulama yapar ve user/token döner.
 * @param {string} googleAccessToken
 * @returns {Promise<Object>} - { token, memberId, email, roleId }
 */
export const googleLogin = async (googleAccessToken) => {
  // Google ile giriş için backend'e access token gönder
  const response = await axios.post(`${API_URL}/api/auth/google`, { token: googleAccessToken });
  return response.data; // { token, memberId, email, roleId }
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
