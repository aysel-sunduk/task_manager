import axios from "axios";

export const fetchAllLogs = async () => {
  const response = await axios.get("/api/activity/logs");
  return response.data;
};
