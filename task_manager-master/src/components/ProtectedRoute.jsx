import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Korumalı route bileşeni - sadece giriş yapmış kullanıcıların erişebileceği sayfalar için
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { token, user, isLoading } = useContext(AuthContext);
  
  // Loading durumunda spinner göster - daha kısa süre
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}>Yükleniyor...</div>
          <div style={{ fontSize: '0.9rem', color: '#999' }}>
            Backend bağlantısı kontrol ediliyor
          </div>
        </div>
      </div>
    );
  }
  
  // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Eğer admin yetkisi gerekiyorsa ve kullanıcı admin değilse, yetkisiz sayfasına yönlendir
  if (requireAdmin && user && user.role !== "admin") {
    return <Navigate to="/not-authorized" replace />;
  }
  
  // Kullanıcı giriş yapmışsa ve yetkisi varsa, içeriği göster
  return children;
};

export default ProtectedRoute; 