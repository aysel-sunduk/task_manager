import React from 'react';
import { useNavigate } from 'react-router-dom';
import Settings from './Settings';
import './css/SettingsDrawerWrapper.css'; 

const SettingsDrawerWrapper = () => {
  const navigate = useNavigate();
  return (
    <Settings
      open={true}
      onClose={() => navigate(-1)}
    />
  );
};

export default SettingsDrawerWrapper; 