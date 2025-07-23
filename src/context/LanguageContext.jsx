import React, { createContext, useEffect, useState } from 'react';

// Tüm uygulamada kullanılacak çeviriler
export const translations = {
  tr: {
    settings: 'Ayarlar',
    theme: 'Tema',
    light: 'Açık',
    dark: 'Koyu',
    language: 'Dil',
    changePassword: 'Şifre Değiştir',
    currentPassword: 'Mevcut Şifre',
    newPassword: 'Yeni Şifre',
    confirmPassword: 'Yeni Şifre (Tekrar)',
    change: 'Şifreyi Değiştir',
    userProfile: 'Kullanıcı Profili',
    name: 'İsim',
    email: 'E-posta',
    updateProfile: 'Profili Güncelle',
    passwordNotMatch: 'Yeni şifreler uyuşmuyor!',
    passwordChanged: 'Şifre başarıyla değiştirildi! (Simülasyon)',
    profileUpdated: 'Profil başarıyla güncellendi! (Simülasyon)',
    show: 'Göster',
    hide: 'Gizle',
    taskManager: 'Görev Yöneticisi',
    dashboard: 'Panel',
    boards: 'Panolar',
    templates: 'Şablonlar',
    create: 'Oluştur',
    notifications: 'Bildirimler',
    search: 'Ara...',
    welcome: 'Hoş Geldiniz',
    placeholder: 'Bu alan çalışma alanı için ayrılmıştır.',
    openSettings: 'Sağ üstteki ayarlar ikonuna tıklayarak ayarlar panelini açabilirsiniz.'
  },
  en: {
    settings: 'Settings',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    change: 'Change Password',
    userProfile: 'User Profile',
    name: 'Name',
    email: 'Email',
    updateProfile: 'Update Profile',
    passwordNotMatch: 'Passwords do not match!',
    passwordChanged: 'Password changed successfully! (Simulation)',
    profileUpdated: 'Profile updated successfully! (Simulation)',
    show: 'Show',
    hide: 'Hide',
    taskManager: 'Task Manager',
    dashboard: 'Dashboard',
    boards: 'Boards',
    templates: 'Templates',
    create: 'Create',
    notifications: 'Notifications',
    search: 'Search...',
    welcome: 'Welcome',
    placeholder: 'This area is reserved for workspace.',
    openSettings: 'Click on the settings icon in the top right to open the settings panel.'
  }
};

// Dil context'i oluştur
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Varsayılan dil olarak tarayıcı dilini veya tr kullan
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'tr';
  });

  // Dil değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Dil değişimi için fonksiyon
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Mevcut dildeki çevirilere kolay erişim
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 