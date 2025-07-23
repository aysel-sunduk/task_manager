import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../App';

// Desteklenen diller
const languages = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
];

const EyeIcon = ({ open }) => (
  <span style={{ cursor: 'pointer', marginLeft: 8, fontSize: 18 }} title={open ? 'Hide' : 'Show'}>
    {open ? (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
        <path d="M1 1l22 22" stroke="#888" strokeWidth="2"/>
        <path d="M12 5C7 5 2.73 8.11 1 12c.73 1.67 1.97 3.16 3.54 4.32M17.94 17.94C16.13 19.25 14.13 20 12 20c-5 0-9.27-3.11-11-7 1.09-2.5 3.09-4.5 5.59-5.59M12 5c2.13 0 4.13.75 5.94 2.06M21.46 16.32A10.97 10.97 0 0023 12c-1.09-2.5-3.09-4.5-5.59-5.59" stroke="#888" strokeWidth="2"/>
      </svg>
    ) : (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
        <ellipse cx="12" cy="12" rx="10" ry="7" stroke="#888" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
      </svg>
    )}
  </span>
);

// Input sınıflarını birleştiren yardımcı fonksiyon
const getInputClass = (baseClass) => {
  return `${baseClass} styled-input`;
}

const Settings = ({ open, onClose }) => {
  // Tema context
  const { theme, setTheme } = useContext(ThemeContext);
  // i18next
  const { t, i18n } = useTranslation();
  // Şifre
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // Profil
  const [profile, setProfile] = useState({
    name: 'Kullanıcı Adı',
    email: 'kullanici@email.com',
  });

  // Tema değişimi
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  // Dil değişimi
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Şifre değişimi simülasyonu
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error(t('passwordNotMatch'));
      return;
    }
    toast.success(t('passwordChanged'));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Profil güncelleme simülasyonu
  const handleProfileChange = (e) => {
    e.preventDefault();
    toast.success(t('profileUpdated'));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ className: `settings-drawer ${theme}` }}>
      <div className="settings-drawer-content">
        <div className="settings-drawer-header">
          <h2 className="settings-title">{t('settings')}</h2>
          <IconButton onClick={onClose} className="drawer-close-btn" size="large">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme === 'dark' ? 'dark' : 'light'}
        />
        <section className="settings-section premium-section">
          <h3 className="section-title">{t('theme')}</h3>
          <label className="radio-label">
            <input
              type="radio"
              value="light"
              checked={theme === 'light'}
              onChange={handleThemeChange}
            />
            {t('light')}
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="dark"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
            {t('dark')}
          </label>
        </section>
        <section className="settings-section premium-section">
          <h3 className="section-title">{t('language')}</h3>
          <select value={i18n.language} onChange={handleLanguageChange} className={getInputClass("settings-select")}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </section>
        <section className="settings-section premium-section">
          <h3 className="section-title">{t('changePassword')}</h3>
          <form onSubmit={handlePasswordChange} className="settings-form">
            <div className="form-group">
              <label>{t('currentPassword')}:</label>
              <div className="password-input-wrapper">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className={getInputClass("premium-input")}
                />
                <span onClick={() => setShowCurrent((v) => !v)}>
                  <EyeIcon open={showCurrent} />
                </span>
              </div>
            </div>
            <div className="form-group">
              <label>{t('newPassword')}:</label>
              <div className="password-input-wrapper">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={getInputClass("premium-input")}
                />
                <span onClick={() => setShowNew((v) => !v)}>
                  <EyeIcon open={showNew} />
                </span>
              </div>
            </div>
            <div className="form-group">
              <label>{t('confirmPassword')}:</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={getInputClass("premium-input")}
                />
                <span onClick={() => setShowConfirm((v) => !v)}>
                  <EyeIcon open={showConfirm} />
                </span>
              </div>
            </div>
            <button type="submit" className="primary-button">{t('change')}</button>
          </form>
        </section>
        <section className="settings-section premium-section">
          <h3 className="section-title">{t('userProfile')}</h3>
          <form onSubmit={handleProfileChange} className="settings-form">
            <div className="form-group">
              <label>{t('name')}:</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
                className={getInputClass("premium-input")}
              />
            </div>
            <div className="form-group">
              <label>{t('email')}:</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
                className={getInputClass("premium-input")}
              />
            </div>
            <button type="submit" className="primary-button">{t('updateProfile')}</button>
          </form>
        </section>
      </div>
    </Drawer>
  );
};

export default Settings;
