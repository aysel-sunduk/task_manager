
import axios from "axios";

export const fetchAllWorkspaces = async () => {
  const response = await axios.get("/api/workspaces");
  return response.data;
};