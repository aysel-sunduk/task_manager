import React, { useEffect, useState } from "react";
import { fetchAllLogs } from "../services/activityService";
import { fetchAllWorkspaces } from "../services/workspaceService";

const Admin = () => {
  const [logs, setLogs] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [logsData, workspacesData] = await Promise.all([
          fetchAllLogs(),
          fetchAllWorkspaces()
        ]);
        setLogs(logsData);
        setWorkspaces(workspacesData);
      } catch (err) {
        setError("Veriler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Admin Paneli</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Loglar</h4>
          <ul className="list-group">
            {logs && logs.length > 0 ? logs.map((log, i) => (
              <li key={i} className="list-group-item">
                {typeof log === 'object' ? JSON.stringify(log) : log}
              </li>
            )) : <li className="list-group-item">Log bulunamadı.</li>}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Tüm Workspaceler</h4>
          <ul className="list-group">
            {workspaces && workspaces.length > 0 ? workspaces.map((ws, i) => (
              <li key={i} className="list-group-item">
                {ws.name || JSON.stringify(ws)}
              </li>
            )) : <li className="list-group-item">Workspace bulunamadı.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin; 