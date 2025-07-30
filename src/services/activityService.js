import axios from "axios";
import { config, getApiUrl } from "../config";

export const fetchAllLogs = async () => {
  try {
    console.log('Activity logs endpoint not available in backend');
    throw new Error('Aktivite logları endpoint\'i backend\'de mevcut değil');
  } catch (error) {
    console.error('Activity logs fetch error:', error);
    throw new Error('Aktivite logları alınamadı: ' + (error.response?.data?.message || error.message));
  }
};