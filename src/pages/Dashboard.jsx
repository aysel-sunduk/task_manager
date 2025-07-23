import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

// Bu component sadece ayarlar butonunu göstermek için basit bir header içeriyor
// Çalışma alanı ve diğer içerikler arkadaşınız tarafından eklenecek
const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openSettings = () => {
    navigate('/settings');
  };

  return (
    <div className={`dashboard ${theme}`}>
      <header className="dashboard-header">
        <div className="header-left">
          <h1>{t('taskManager')}</h1>
        </div>
        
        <div className="header-actions">
          <IconButton 
            onClick={openSettings} 
            className="settings-icon-btn"
            title={t('settings')}
          >
            <SettingsIcon />
          </IconButton>
        </div>
      </header>

      {/* Buraya arkadaşınızın çalışma alanı gelecek */}
      <div className="dashboard-placeholder">
        <p>{t('placeholder')}</p>
        <p>{t('openSettings')}</p>
      </div>
    </div>
  );
};

export default Dashboard;
