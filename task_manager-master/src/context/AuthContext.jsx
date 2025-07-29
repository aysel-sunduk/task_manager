import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { config, getApiUrl } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Token doğrulama fonksiyonu - timeout ile
  const validateToken = async (token) => {
    try {
      // Token doğrulama özelliği kapalıysa veya development modunda skip ediliyorsa true döndür
      if (!config.ENABLE_TOKEN_VALIDATION || (config.SKIP_TOKEN_VALIDATION_IN_DEV && config.ENV === "development")) {
        console.log('Token validation skipped - development mode or disabled');
        return true;
      }
      
      // Timeout ile backend'den token doğrulama isteği
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 saniye timeout
      
      const response = await fetch(getApiUrl(config.ENDPOINTS.VALIDATE_TOKEN), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      // Network error veya timeout durumunda development modunda true döndür
      if (config.ENV === "development" || error.name === 'AbortError') {
        console.warn('Backend bağlantısı yok, development modunda devam ediliyor');
        return true;
      }
      return false;
    }
  };

  // Uygulama açılışında localStorage'dan token'ı ve user bilgisini oku
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      
      if (storedToken) {
        // Token doğrulama (backend bağlantısı varsa)
        const isValid = await validateToken(storedToken);
        
        if (isValid) {
          setToken(storedToken);
          
          // Kullanıcı bilgisi varsa onu da yükle
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (error) {
              console.error("User parsing error:", error);
            }
          }
        } else {
          // Token geçersizse temizle
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
