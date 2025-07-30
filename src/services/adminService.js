import axios from "axios";
import { getApiUrl, config } from "../config";

// Dashboard istatistiklerini getir
export const getDashboardStats = async () => {
  try {
    console.log('Fetching dashboard stats from:', getApiUrl(config.ENDPOINTS.ADMIN_DASHBOARD));
    const response = await axios.get(getApiUrl(config.ENDPOINTS.ADMIN_DASHBOARD));
    console.log('Dashboard stats response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Dashboard stats error:', error);
    throw error;
  }
};

// Workspace sayısını getir
export const getWorkspacesCount = async () => {
  try {
    console.log('Fetching workspaces count from:', getApiUrl(config.ENDPOINTS.ADMIN_WORKSPACES_COUNT));
    const response = await axios.get(getApiUrl(config.ENDPOINTS.ADMIN_WORKSPACES_COUNT));
    console.log('Workspaces count response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Workspaces count error:', error);
    throw error;
  }
};

// Aktif kullanıcı sayısını getir
export const getActiveUsersCount = async () => {
  try {
    console.log('Fetching active users count from:', getApiUrl(config.ENDPOINTS.ADMIN_USERS_ACTIVE_COUNT));
    const response = await axios.get(getApiUrl(config.ENDPOINTS.ADMIN_USERS_ACTIVE_COUNT));
    console.log('Active users count response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Active users count error:', error);
    throw error;
  }
};

// Tüm workspace'leri getir (admin için yeni endpoint)
export const getAllWorkspacesForAdmin = async () => {
  try {
    console.log('Fetching all workspaces for admin from:', getApiUrl(config.ENDPOINTS.ADMIN_WORKSPACES));
    const response = await axios.get(getApiUrl(config.ENDPOINTS.ADMIN_WORKSPACES));
    console.log('All workspaces for admin response:', response.data);
    return response.data;
  } catch (error) {
    console.error('All workspaces for admin error:', error);
    throw error;
  }
};

// Sistem loglarını getir (şimdilik boş, backend'de log sistemi yok)
export const getSystemLogs = async () => {
  try {
    console.log('Fetching system logs from:', getApiUrl("/api/admin/logs"));
    const response = await axios.get(getApiUrl("/api/admin/logs"));
    console.log('System logs response:', response.data);
    return response.data;
  } catch (error) {
    console.error('System logs error:', error);
    // Backend'de log sistemi olmadığı için boş array döndür
    return [];
  }
};