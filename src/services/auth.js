import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post("/api/login", { email, password });
  return response.data; // { token, user }
};

export const register = async (userData) => {
  const response = await axios.post("/api/register", userData);
  return response.data;
};

// Not: Eğer kullanıcı URL'de manuel olarak / ile değişiklik yaparsa, logout işlemini tetiklemek için
// üst seviye bir bileşende (örn. App.js veya AuthProvider içinde) window.location.pathname değişimini izleyip
// yetkisiz erişim tespit edildiğinde logout fonksiyonu çağrılabilir.
