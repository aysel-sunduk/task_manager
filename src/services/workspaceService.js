// src/services/workspaceService.js
import axios from 'axios';
import { config } from '../config';

const BASE_URL = `${config.API_URL}/api/workspaces`; // API temel URL'si config'den al

/**
 * Yeni bir çalışma alanı (workspace) oluşturur.
 * @param {number} memberId - Üyenin ID'si
 * @param {string} workspaceName - Oluşturulacak çalışma alanının adı
 * @returns {Promise<Object>} - Sunucudan gelen yanıt verisi
 */
export const createWorkspace = async (memberId, workspaceName) => {
  try {
    console.log('Creating workspace with:', { memberId, workspaceName });
    const response = await axios.post(BASE_URL, {
      memberId,
      workspaceName,
    });
    console.log('Workspace created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Çalışma alanı oluşturulurken hata:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Kullanıcının çalışma alanlarını (workspaces) listeler.
 * @param {number} memberId - Kullanıcının member ID'si (opsiyonel)
 * @returns {Promise<Array>} - Workspace listesini içeren dizi
 */
export const fetchAllWorkspaces = async (memberId = null) => {
  try {
    let url = BASE_URL;
    
    // Eğer memberId verilmişse, kullanıcının workspace'lerini çek
    if (memberId) {
      url = `${BASE_URL}/member/${memberId}`;
      console.log('Kullanıcının workspace\'leri çekiliyor:', url);
    } else {
      console.log('Tüm workspace\'ler çekiliyor:', url);
    }
    
    const response = await axios.get(url);
    console.log('Backend\'den gelen workspace\'ler:', response.data);
    return response.data;
  } catch (error) {
    console.error('Workspace listesi alınırken hata:', error.response?.data || error.message);
    
    // Eğer memberId ile endpoint bulunamazsa, tüm workspace'leri çek ve frontend'de filtrele
    if (memberId && error.response?.status === 404) {
      console.log('Member-specific endpoint bulunamadı, tüm workspace\'ler çekiliyor...');
      try {
        const allResponse = await axios.get(BASE_URL);
        const allWorkspaces = allResponse.data;
        
        // Frontend'de memberId'ye göre filtrele
        const userWorkspaces = allWorkspaces.filter(ws => 
          ws.memberId === memberId || ws.createdBy === memberId
        );
        
        console.log('Filtrelenmiş workspace\'ler:', userWorkspaces);
        return userWorkspaces;
      } catch (fallbackError) {
        console.error('Fallback workspace çekme hatası:', fallbackError);
        throw fallbackError;
      }
    }
    
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
    const response = await axios.get(`${config.API_URL}/api/workspace-members/${workspaceId}`);
    return response.data;
  } catch (error) {
    console.error('Workspace üyeleri alınırken hata:', error.response?.data || error.message);
    throw error;
  }
};
