// src/services/workspaceService.js
import axios from 'axios';

const BASE_URL = 'http://192.168.234.28:8080/api/workspaces'; // API temel URL'si, istersen .env'den alabilirsin

/**
 * Yeni bir çalışma alanı (workspace) oluşturur.
 * @param {number} memberId - Üyenin ID'si
 * @param {string} workspaceName - Oluşturulacak çalışma alanının adı
 * @returns {Promise<Object>} - Sunucudan gelen yanıt verisi
 */
export const createWorkspace = async (memberId, workspaceName) => {
  try {
    const response = await axios.post(BASE_URL, {
      memberId,
      workspaceName,
    });
    return response.data;
  } catch (error) {
    console.error('Çalışma alanı oluşturulurken hata:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Tüm çalışma alanlarını (workspaces) listeler.
 * @returns {Promise<Array>} - Workspace listesini içeren dizi
 */
export const fetchAllWorkspaces = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Workspace listesi alınırken hata:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Belirli bir çalışma alanının üyelerini getirir.
 * @param {string|number} workspaceId - Workspace'in ID'si
 * @returns {Promise<Array>} - Üye listesi
 */
export const fetchWorkspaceMembers = async (workspaceId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/workspace-members/${workspaceId}`);
    return response.data;
  } catch (error) {
    console.error('Workspace üyeleri alınırken hata:', error.response?.data || error.message);
    throw error;
  }
};
