import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import NotAuthorized from './pages/NotAuthorized';
import Register from './pages/Register';
import SettingsDrawerWrapper from './pages/SettingsDrawerWrapper';
import WorkSpace from './pages/WorkSpace';
// Diğer sayfalar

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/register" element={<Register />} />
    <Route path="/not-authorized" element={<NotAuthorized />} />
    <Route path="/404" element={<NotFound />} />
    
    {/* Protected routes */}
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
    <Route 
      path="/settings" 
      element={
        <ProtectedRoute>
          <SettingsDrawerWrapper />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/admin" 
      element={
        <ProtectedRoute requireAdmin={true}>
          <Admin />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/Admin" 
      element={
        <ProtectedRoute requireAdmin={true}>
          <Admin />
        </ProtectedRoute>
      } 
    />
    
    {/* Catch-all route for 404 - must be last */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;