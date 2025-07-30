import React, { useState, useEffect } from "react";
import { Home, Activity, Users, Settings, Bell, Search, Plus } from "lucide-react";
import { 
  getDashboardStats, 
  getWorkspacesCount, 
  getActiveUsersCount, 
  getAllWorkspacesForAdmin, 
  getSystemLogs 
} from "../services/adminService";

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
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button 
            onClick={toggleSidebar}
            style={styles.menuButton}
          >
            <Home size={20} />
          </button>
          <div style={styles.logoContainer}>
            <img
              src="/images/logo.jpg"
              alt="Logo"
              style={styles.logo}
            />
          </div>
          <span style={styles.brandName}>Nodora Admin</span>
        </div>

        <div style={styles.searchContainer}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Ara..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.headerRight}>
          <button style={styles.createButton}>
            <Plus size={16} />
            Oluştur
          </button>
          <button style={styles.iconButton}>
            <Bell size={20} />
          </button>
          <button style={styles.iconButton}>
            <Settings size={20} />
          </button>
          <div style={styles.userAvatar}>
            <span style={styles.userInitial}>A</span>
          </div>
        </div>
      </header>

      <div style={styles.mainContainer}>
        {/* Sidebar */}
        {showSidebar && (
          <aside style={styles.sidebar}>
            <nav style={styles.nav}>
              <button
                onClick={() => setSelectedPage("dashboard")}
                style={{
                  ...styles.navButton,
                  ...(selectedPage === "dashboard" && styles.activeNavButton)
                }}
              >
                <Home size={20} />
                Anasayfa
              </button>
              
              <button
                onClick={() => setSelectedPage("logs")}
                style={{
                  ...styles.navButton,
                  ...(selectedPage === "logs" && styles.activeNavButton)
                }}
              >
                <Activity size={20} />
                Sistem Logları
              </button>
              
              <button
                onClick={() => setSelectedPage("workspaces")}
                style={{
                  ...styles.navButton,
                  ...(selectedPage === "workspaces" && styles.activeNavButton)
                }}
              >
                <Users size={20} />
                Tüm Workspaceler
              </button>
            </nav>

            <div style={styles.sidebarSection}>
              <h3 style={styles.sidebarTitle}>Yönetim Paneli</h3>
              <p style={styles.sidebarText}>
                Sistem yönetimi ve izleme araçları
              </p>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main style={styles.mainContent}>
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
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Dashboard verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorContent}>
          <h3 style={styles.errorTitle}>Hata!</h3>
          <p style={styles.errorText}>{error}</p>
          <button 
            onClick={onRetry}
            style={styles.retryButton}
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashboardContainer}>
      <h1 style={styles.pageTitle}>Admin Anasayfa</h1>
      <p style={styles.pageSubtitle}>Sistem yönetimi ve izleme paneline hoş geldiniz</p>
      
      <div style={styles.dashboardGrid}>
        <div style={styles.dashboardCard}>
          <h3 style={styles.cardTitle}>Sistem Durumu</h3>
          <p style={styles.cardText}>
            {stats?.message || "Sistem normal çalışıyor"}
          </p>
        </div>
        
        <div style={styles.dashboardCard}>
          <h3 style={styles.cardTitle}>Aktif Kullanıcılar</h3>
          <p style={styles.cardText}>
            {stats?.activeUserCount || 0} kullanıcı aktif
          </p>
        </div>
        
        <div style={styles.dashboardCard}>
          <h3 style={styles.cardTitle}>Toplam Workspace</h3>
          <p style={styles.cardText}>
            {stats?.workspaceCount || 0} workspace mevcut
          </p>
        </div>
        
        <div style={styles.dashboardCard}>
          <h3 style={styles.cardTitle}>Sistem Bilgileri</h3>
          <p style={styles.cardText}>
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
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Sistem Logları</h1>
      <p style={styles.pageSubtitle}>Sistem aktivitelerini takip edin</p>
      
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loglar yükleniyor...</p>
          </div>
        </div>
      ) : logs.length === 0 ? (
        <div style={styles.emptyContainer}>
          <p style={styles.emptyText}>Henüz log kaydı bulunmuyor</p>
          <p style={styles.emptySubtext}>Sistem logları burada görüntülenecek</p>
        </div>
      ) : (
        <div style={styles.logsContainer}>
          {logs.map((log, i) => (
            <div key={i} style={styles.logItem}>
              <div style={styles.logHeader}>
                <span style={styles.logAction}>{log.action || 'Sistem aktivitesi'}</span>
                <span style={styles.logTime}>
                  {new Date(log.timestamp || Date.now()).toLocaleString('tr-TR')}
                </span>
              </div>
              <div style={styles.logDetails}>
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
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Tüm Workspaceler</h1>
      <p style={styles.pageSubtitle}>Sistemdeki tüm çalışma alanlarını görüntüleyin</p>
      
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Workspace'ler yükleniyor...</p>
          </div>
        </div>
      ) : workspaces.length === 0 ? (
        <div style={styles.emptyContainer}>
          <p style={styles.emptyText}>Henüz workspace bulunmuyor</p>
          <p style={styles.emptySubtext}>Oluşturulan workspace'ler burada görüntülenecek</p>
        </div>
      ) : (
        <div style={styles.workspacesContainer}>
          {workspaces.map((ws, i) => (
            <div key={i} style={styles.workspaceItem}>
              <div style={styles.workspaceHeader}>
                <h3 style={styles.workspaceName}>{ws.name || ws.workspaceName}</h3>
                <span style={styles.workspaceId}>ID: {ws.id}</span>
              </div>
              <div style={styles.workspaceDetails}>
                <p style={styles.workspaceDescription}>
                  {ws.description || 'Workspace açıklaması mevcut değil'}
                </p>
                <div style={styles.workspaceInfo}>
                  <span style={styles.infoItem}>
                    <strong>Oluşturulma:</strong> {ws.creationDate ? new Date(ws.creationDate).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
                  </span>
                  <span style={styles.infoItem}>
                    <strong>Durum:</strong> {ws.active ? 'Aktif' : 'Pasif'}
                  </span>
                  {ws.memberCount && (
                    <span style={styles.infoItem}>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#1d2437',
    color: '#ffffff'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    height: '56px',
    background: '#1d2437',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  menuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '4px',
    color: '#fff',
    transition: 'background 0.2s'
  },
  logoContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#4f8cff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  brandName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#fff',
    margin: 0
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    flex: 1,
    maxWidth: '400px',
    margin: '0 2rem'
  },
  searchIcon: {
    color: '#fff',
    marginRight: '0.5rem'
  },
  searchInput: {
    border: 'none',
    background: 'none',
    outline: 'none',
    flex: 1,
    fontSize: '1rem',
    color: '#fff'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  createButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(90deg, #4f8cff 60%, #6c63ff 100%)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'background 0.2s, box-shadow 0.2s'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '4px',
    color: '#fff',
    transition: 'background 0.2s'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4f8cff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  userInitial: {
    fontSize: '1.2rem'
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#1d2437',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    padding: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0 1rem'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#fff',
    transition: 'all 0.2s'
  },
  activeNavButton: {
    background: 'linear-gradient(90deg, #4f8cff 60%, #6c63ff 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(79, 140, 255, 0.3)'
  },
  sidebarSection: {
    marginTop: 'auto',
    padding: '1rem',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  sidebarTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '0.5rem'
  },
  sidebarText: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.4'
  },
  mainContent: {
    flex: 1,
    padding: '2rem',
    overflow: 'auto',
    backgroundColor: '#1d2437'
  },
  dashboardContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '0.5rem'
  },
  pageSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '2rem'
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  dashboardCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'box-shadow 0.2s'
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '0.5rem'
  },
  cardText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #4f8cff 60%, #6c63ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px'
  },
  loadingContent: {
    textAlign: 'center'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255,255,255,0.1)',
    borderTop: '4px solid #4f8cff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem'
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '1rem'
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px'
  },
  errorContent: {
    textAlign: 'center',
    maxWidth: '400px'
  },
  errorTitle: {
    color: '#ff6b6b',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  errorText: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '1rem'
  },
  retryButton: {
    background: 'linear-gradient(90deg, #4f8cff 60%, #6c63ff 100%)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.2s'
  },
  pageContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  logsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem'
  },
  logItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'box-shadow 0.2s'
  },
  logHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  logAction: {
    fontWeight: 'bold',
    color: '#fff'
  },
  logTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.9rem'
  },
  logDetails: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.9rem'
  },
  workspacesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  workspaceItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'box-shadow 0.2s'
  },
  workspaceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  workspaceName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0
  },
  workspaceId: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    background: 'linear-gradient(90deg, #4f8cff 60%, #6c63ff 100%)',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontWeight: '600'
  },
  workspaceDetails: {
    marginTop: '0.5rem'
  },
  workspaceDescription: {
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.4',
    marginBottom: '1rem'
  },
  workspaceInfo: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  infoItem: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)'
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '2rem',
    color: 'rgba(255,255,255,0.7)'
  },
  emptyText: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#fff'
  },
  emptySubtext: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)'
  }
};

export default Admin;