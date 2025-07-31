import { Activity, Bell, Home, Plus, Search, Settings, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllWorkspacesForAdmin,
  getDashboardStats,
  getSystemLogs
} from "../services/adminService";
import './css/Admin.css';

const Admin = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const stats = await getDashboardStats();
      setDashboardStats(stats);
    } catch (err) {
      setError('Dashboard verileri yüklenemedi: ' + err.message);
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWorkspaces = async () => {
    try {
      const workspacesData = await getAllWorkspacesForAdmin();
      setWorkspaces(workspacesData);
    } catch (err) {
      console.error('Workspaces load error:', err);
      setWorkspaces([]);
    }
  };

  const loadLogs = async () => {
    try {
      const logsData = await getSystemLogs();
      setLogs(logsData);
    } catch (err) {
      console.error('Logs load error:', err);
      setLogs([]);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "logs":
        return <SystemLogs logs={logs} onLoad={loadLogs} />;
      case "workspaces":
        return <AllWorkspaces workspaces={workspaces} onLoad={loadWorkspaces} />;
      default:
        return <AdminDashboard stats={dashboardStats} loading={loading} error={error} onRetry={loadDashboardStats} />;
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <button 
            onClick={toggleSidebar}
            className="admin-menu-button"
          >
            <Home size={20} />
          </button>
          <div className="admin-logo-container">
            <img
              src="/images/logo.jpg"
              alt="Logo"
              className="admin-logo"
            />
          </div>
          <span className="admin-brand-name">Nodora Admin</span>
        </div>

        <div className="admin-search-container">
          <Search size={20} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Ara..."
            className="admin-search-input"
          />
        </div>

        <div className="admin-header-right">
          <button className="admin-create-button">
            <Plus size={16} />
            Oluştur
          </button>
          <button className="admin-icon-button">
            <Bell size={20} />
          </button>
          <button className="admin-icon-button">
            <Settings size={20} />
          </button>
          <div className="admin-user-avatar">
            <span className="admin-user-initial">A</span>
          </div>
        </div>
      </header>

      <div className="admin-main-container">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="admin-sidebar">
            <nav className="admin-nav">
              <button
                onClick={() => setSelectedPage("dashboard")}
                className={`admin-nav-button ${selectedPage === "dashboard" ? "admin-active-nav-button" : ""}`}
              >
                <Home size={20} />
                Anasayfa
              </button>
              
              <button
                onClick={() => setSelectedPage("logs")}
                className={`admin-nav-button ${selectedPage === "logs" ? "admin-active-nav-button" : ""}`}
              >
                <Activity size={20} />
                Sistem Logları
              </button>
              
              <button
                onClick={() => setSelectedPage("workspaces")}
                className={`admin-nav-button ${selectedPage === "workspaces" ? "admin-active-nav-button" : ""}`}
              >
                <Users size={20} />
                Tüm Workspaceler
              </button>
            </nav>

            <div className="admin-sidebar-section">
              <h3 className="admin-sidebar-title">Yönetim Paneli</h3>
              <p className="admin-sidebar-text">
                Sistem yönetimi ve izleme araçları
              </p>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="admin-main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ stats, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-content">
          <div className="admin-spinner"></div>
          <p className="admin-loading-text">Dashboard verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <div className="admin-error-content">
          <h3 className="admin-error-title">Hata!</h3>
          <p className="admin-error-text">{error}</p>
          <button 
            onClick={onRetry}
            className="admin-retry-button"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-page-title">Admin Anasayfa</h1>
      <p className="admin-page-subtitle">Sistem yönetimi ve izleme paneline hoş geldiniz</p>
      
      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <h3 className="admin-card-title">Sistem Durumu</h3>
          <p className="admin-card-text">
            {stats?.message || "Sistem normal çalışıyor"}
          </p>
        </div>
        
        <div className="admin-dashboard-card">
          <h3 className="admin-card-title">Aktif Kullanıcılar</h3>
          <p className="admin-card-text">
            {stats?.activeUserCount || 0} kullanıcı aktif
          </p>
        </div>
        
        <div className="admin-dashboard-card">
          <h3 className="admin-card-title">Toplam Workspace</h3>
          <p className="admin-card-text">
            {stats?.workspaceCount || 0} workspace mevcut
          </p>
        </div>
        
        <div className="admin-dashboard-card">
          <h3 className="admin-card-title">Sistem Bilgileri</h3>
          <p className="admin-card-text">
            Backend bağlantısı aktif
          </p>
        </div>
      </div>
    </div>
  );
};

// System Logs Component
const SystemLogs = ({ logs, onLoad }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (logs.length === 0) {
      loadLogs();
    }
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      await onLoad();
    } catch (error) {
      console.error('Logs load error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Sistem Logları</h1>
      <p className="admin-page-subtitle">Sistem aktivitelerini takip edin</p>
      
      {loading ? (
        <div className="admin-loading-container">
          <div className="admin-loading-content">
            <div className="admin-spinner"></div>
            <p className="admin-loading-text">Loglar yükleniyor...</p>
          </div>
        </div>
      ) : logs.length === 0 ? (
        <div className="admin-empty-container">
          <p className="admin-empty-text">Henüz log kaydı bulunmuyor</p>
          <p className="admin-empty-subtext">Sistem logları burada görüntülenecek</p>
        </div>
      ) : (
        <div className="admin-logs-container">
          {logs.map((log, i) => (
            <div key={i} className="admin-log-item">
              <div className="admin-log-header">
                <span className="admin-log-action">{log.action || 'Sistem aktivitesi'}</span>
                <span className="admin-log-time">
                  {new Date(log.timestamp || Date.now()).toLocaleString('tr-TR')}
                </span>
              </div>
              <div className="admin-log-details">
                {log.details || 'Sistem log kaydı'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// All Workspaces Component
const AllWorkspaces = ({ workspaces, onLoad }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (workspaces.length === 0) {
      loadWorkspaces();
    }
  }, []);

  const loadWorkspaces = async () => {
    setLoading(true);
    try {
      await onLoad();
    } catch (error) {
      console.error('Workspaces load error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Tüm Workspaceler</h1>
      <p className="admin-page-subtitle">Sistemdeki tüm çalışma alanlarını görüntüleyin</p>
      
      {loading ? (
        <div className="admin-loading-container">
          <div className="admin-loading-content">
            <div className="admin-spinner"></div>
            <p className="admin-loading-text">Workspace'ler yükleniyor...</p>
          </div>
        </div>
      ) : workspaces.length === 0 ? (
        <div className="admin-empty-container">
          <p className="admin-empty-text">Henüz workspace bulunmuyor</p>
          <p className="admin-empty-subtext">Oluşturulan workspace'ler burada görüntülenecek</p>
        </div>
      ) : (
        <div className="admin-workspaces-container">
          {workspaces.map((ws, i) => (
            <div key={i} className="admin-workspace-item">
              <div className="admin-workspace-header">
                <h3 className="admin-workspace-name">{ws.name || ws.workspaceName}</h3>
                <span className="admin-workspace-id">ID: {ws.id}</span>
              </div>
              <div className="admin-workspace-details">
                <p className="admin-workspace-description">
                  {ws.description || 'Workspace açıklaması mevcut değil'}
                </p>
                <div className="admin-workspace-info">
                  <span className="admin-info-item">
                    <strong>Oluşturulma:</strong> {ws.creationDate ? new Date(ws.creationDate).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
                  </span>
                  <span className="admin-info-item">
                    <strong>Durum:</strong> {ws.active ? 'Aktif' : 'Pasif'}
                  </span>
                  {ws.memberCount && (
                    <span className="admin-info-item">
                      <strong>Üye Sayısı:</strong> {ws.memberCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;