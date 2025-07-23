import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import SettingsDrawerWrapper from './pages/SettingsDrawerWrapper';
import WorkSpace from './pages/WorkSpace';
// Diğer sayfalar

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route 
      path="/dashboard" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/workspace" 
      element={
        <ProtectedRoute>
          <WorkSpace />
        </ProtectedRoute>
      } 
    />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/register" element={<Register />} />
    <Route 
      path="/settings" 
      element={
        <ProtectedRoute>
          <SettingsDrawerWrapper />
        </ProtectedRoute>
      } 
    />
    <Route path="*" element={<Login />} />
  </Routes>
);

export default AppRoutes;
