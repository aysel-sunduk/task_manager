import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Korumalı route bileşeni - sadece giriş yapmış kullanıcıların erişebileceği sayfalar için
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  
  // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Kullanıcı giriş yapmışsa, içeriği göster
  return children;
};

export default ProtectedRoute; 