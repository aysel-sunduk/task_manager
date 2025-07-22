import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Uygulama açılışında localStorage'dan token'ı oku
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Kullanıcı bilgisini de localStorage'dan veya bir API'den çekebilirsin
    }
    // MOCK veri ile otomatik login (sadece test için)
    if (!storedToken) {
      const mockUser = { name: "Test Admin", email: "admin@test.com", role: "admin" };
      const mockToken = "mock-admin-token-123";
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("token", mockToken);
    }
  }, []);

  // URL değişimini ve kullanıcı rolünü izleyip yetkisiz erişimde logout yap
  useEffect(() => {
    if (user) {
      const path = window.location.pathname;
      if (user.role === "admin") {
        if (!["/dashboard", "/settings", "/admin"].includes(path)) {
          logout();
        }
      } else {
        if (["/admin"].includes(path)) {
          logout();
        }
      }
    }
  }, [user, window.location.pathname]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
