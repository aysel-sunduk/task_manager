'use client'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '../components/ui/Avatar'
import { AuthContext } from '../context/AuthContext'

import {
  Bell,
  ChevronDown,
  ChevronUp,
  Grid3X3,
  Home,
  Lock,
  Menu,
  Plus,
  Search,
  Settings,
  Users
} from 'lucide-react'
import '../App.css'

export default function WorkSpace () {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [workspaces, setWorkspaces] = useState([])
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [newBoardName, setNewBoardName] = useState('')
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})
  const [showMemberForm, setShowMemberForm] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)

  // Davet modal state'leri
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [mainView, setMainView] = useState({ type: 'default' })

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U'
    const nameParts = user.name.split(' ')
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return nameParts[0][0].toUpperCase()
  }

  // Basit email doğrulama regex'i
  const validateEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleAddWorkspace = () => {
    if (newWorkspaceName.trim() === '') return
    const newWs = { name: newWorkspaceName, boards: [], members: [] }
    setWorkspaces([...workspaces, newWs])
    setNewWorkspaceName('')
    setShowWorkspaceModal(false)
    setSelectedWorkspace(newWs)
    setMainView({ type: 'workspaceBoards', workspace: newWs })
  }

  const handleAddBoard = () => {
    if (!selectedWorkspace || newBoardName.trim() === '') return
    setWorkspaces(prevWs => {
      const updated = prevWs.map(ws =>
        ws.name === selectedWorkspace.name
          ? { ...ws, boards: [...ws.boards, { name: newBoardName }] }
          : ws
      )
      const updatedWs = updated.find(ws => ws.name === selectedWorkspace.name)
      setSelectedWorkspace(updatedWs)
      setMainView({ type: 'workspaceBoards', workspace: updatedWs })
      return updated
    })
    setNewBoardName('')
    setShowBoardModal(false)
  }

  const handleSelectWorkspace = ws => {
    setSelectedWorkspace(ws)
    setMainView({ type: 'workspaceBoards', workspace: ws })
  }

  const toggleMenu = wsName => {
    setExpandedMenus(prev => ({ ...prev, [wsName]: !prev[wsName] }))
  }

  const handleShowAllBoards = () => {
    setMainView({ type: 'allBoards' })
  }

  const handleShowWorkspaceBoards = ws => {
    const current = workspaces.find(w => w.name === ws.name) || ws
    setSelectedWorkspace(current)
    setMainView({ type: 'workspaceBoards', workspace: current })
  }

  const handleShowWorkspaceMembers = ws => {
    const current = workspaces.find(w => w.name === ws.name) || ws
    setSelectedWorkspace(current)
    setMainView({ type: 'workspaceMembers', workspace: current })
  }

  const getCurrentWorkspace = ws =>
    workspaces.find(w => w.name === ws?.name) || ws

  // Davet maili gönderme işlemi (simülasyon)
  const handleSendInvite = () => {
    if (!validateEmail(inviteEmail)) {
      setEmailError('Lütfen geçerli bir e-posta adresi girin.')
      return
    }
    setEmailError('')
    alert(`${inviteEmail} adresine davet gönderildi!`) // Burada gerçek API çağrısı yapılabilir.
    setInviteEmail('')
    setShowInviteModal(false)
  }

  // Responsive için sidebar toggle
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  // Görseli inline stil ile ekleyelim
  const styles = `
  .icon-button {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .icon-button:hover {
    transform: scale(1.2);
    opacity: 0.8;
  }
  
  .settings-icon:hover svg {
    animation: rotate 1.5s linear infinite;
  }
  
  .avatar-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .avatar-hover:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(79, 140, 255, 0.6);
    cursor: pointer;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .pulsing-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
  
  .pulsing-avatar::before,
  .pulsing-avatar::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid #4f8cff;
    border-radius: 50%;
    opacity: 0;
    z-index: -1;
  }
  
  .pulsing-avatar::before {
    animation: pulse-ring 2s linear infinite;
  }
  
  .pulsing-avatar::after {
    animation: pulse-ring 2s linear infinite 0.5s;
  }
  
  .pulsing-avatar:hover::before,
  .pulsing-avatar:hover::after {
    opacity: 1;
  }
  
  @keyframes pulse-ring {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`

  return (
    <>
      <style>{styles}</style>
      <div className='container-fluid p-0'>
        {/* Ana içerik */}
        {/* Arka plan overlay'ini kaldırıyorum */}

        {/* Top Navigation */}
        <header
          className='app-header'
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className='container-fluid'>
            <div className='row align-items-center'>
              <div className='col-auto d-flex align-items-center'>
                <button
                  className='btn btn-link d-md-none me-2 text-white'
                  onClick={toggleSidebar}
                >
                  <Menu size={20} />
                </button>
                <div className='logo-container' style={{ marginRight: 8 }}>
                  <img
                    src='/images/logo.jpg' // png yerine jpg oldu
                    alt='Logo'
                    className='logo-img'
                  />
                </div>

                <span style={{ fontWeight: 'bold', fontSize: 22 }}>Nodora</span>
              </div>
              <div className='col'>
                <div className='position-relative'>
                  <Search
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9a8c98',
                      zIndex: 1
                    }}
                  />
                  <input
                    className='styled-input form-control'
                    placeholder='Ara'
                    style={{ paddingLeft: 36, marginBottom: 0 }}
                  />
                </div>
              </div>
              <div className='col-auto d-flex align-items-center gap-2'>
                <button
                  className='primary-button btn'
                  onClick={() => setShowWorkspaceModal(true)}
                >
                  Oluştur
                </button>
                <button
                  className='btn btn-transparent icon-button'
                  style={{ background: 'transparent', padding: 8 }}
                >
                  <Bell size={20} color='#4f8cff' />{' '}
                  {/* Bildirim ikonunun rengi */}
                </button>
                <button
                  className='btn btn-transparent icon-button settings-icon'
                  style={{ background: 'transparent', padding: 8 }}
                  onClick={() => navigate('/settings')}
                >
                  <Settings size={20} color='#4f8cff' />{' '}
                  {/* Ayarlar ikonunun rengi */}
                </button>
                {/* Avatar bileşenini düzenliyorum */}
                <Avatar
                  className='pulsing-avatar'
                  style={{
                    backgroundColor: '#4f8cff',
                    color: '#ffffff',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <AvatarFallback
                    style={{
                      backgroundColor: '#4f8cff',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className='container-fluid'>
          <div className='row'>
            {/* Sidebar - Mobilde gizlenir */}
            <aside
              className={`col-md-3 col-lg-2 p-3 ${
                showSidebar ? 'd-block' : 'd-none d-md-block'
              }`}
              style={{ maxWidth: 260 }}
            >
              <nav>
                <button
                  className='button btn w-100 mb-2 d-flex align-items-center'
                  onClick={handleShowAllBoards}
                >
                  <Grid3X3 style={{ marginRight: 8 }} />
                  <span>Panolar</span>
                </button>
                <button
                  className='button btn w-100 mb-2 d-flex align-items-center'
                  style={{ background: '#c9ada7', color: '#22223b' }}
                >
                  <Home style={{ marginRight: 8 }} />
                  <span>Anasayfa</span>
                </button>
              </nav>
              {/* Dinamik Çalışma Alanları */}
              <div style={{ marginTop: 32 }}>
                <h3
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 16
                  }}
                >
                  Çalışma Alanları
                </h3>
                {workspaces.length === 0 && (
                  <div style={{ color: '#ddd', fontSize: 14 }}>
                    Henüz bir çalışma alanı yok.
                  </div>
                )}
                {workspaces.map((ws, i) => (
                  <div key={i}>
                    <button
                      className='button btn w-100 mb-1 d-flex align-items-center'
                      style={{
                        background:
                          selectedWorkspace === ws
                            ? 'rgba(242,233,228,0.2)'
                            : 'rgba(244,162,97,0.2)',
                        fontWeight: 'bold',
                        justifyContent: 'flex-start'
                      }}
                      onClick={() => {
                        handleSelectWorkspace(ws)
                        toggleMenu(ws.name)
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          background: '#f4a261',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          marginRight: 8
                        }}
                      >
                        {ws.name[0]}
                      </span>
                      {ws.name}
                      {expandedMenus[ws.name] ? (
                        <ChevronUp style={{ marginLeft: 'auto' }} />
                      ) : (
                        <ChevronDown style={{ marginLeft: 'auto' }} />
                      )}
                    </button>
                    {expandedMenus[ws.name] && (
                      <div
                        style={{
                          marginLeft: 36,
                          marginTop: 4,
                          marginBottom: 8
                        }}
                      >
                        <button
                          className='button btn w-100 mb-1 d-flex align-items-center'
                          style={{
                            background: 'rgba(74,78,105,0.3)',
                            justifyContent: 'flex-start'
                          }}
                          onClick={() => handleShowWorkspaceBoards(ws)}
                        >
                          <Grid3X3 style={{ marginRight: 6 }} />
                          Panolar
                        </button>
                        <div className='d-flex align-items-center gap-1 mb-1'>
                          {/* Üye Ekle butonu */}
                          <button
                            className='button btn flex-grow-1 d-flex align-items-center'
                            style={{
                              background: 'rgba(154,140,152,0.3)',
                              justifyContent: 'flex-start'
                            }}
                            onClick={() => setShowInviteModal(true)}
                          >
                            <Users style={{ marginRight: 6 }} />
                            Üye Ekle
                          </button>
                          <button
                            className='button btn'
                            style={{
                              background: 'rgba(224,225,221,0.2)',
                              fontWeight: 'bold',
                              fontSize: '0.8rem',
                              padding: '4px 6px'
                            }}
                            onClick={() => handleShowWorkspaceMembers(ws)}
                          >
                            Üyeleri Gör
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <main className='col-md-9 col-lg-10 p-3'>
              {mainView.type === 'default' && (
                <div className='text-center py-5'>
                  <h3 className='mb-3'>
                    Bir çalışma alanı seçin veya oluşturun.
                  </h3>
                </div>
              )}
              {mainView.type === 'allBoards' && (
                <div>
                  <h2 className='fs-3 fw-bold mb-4'>Tüm Panolar</h2>
                  {workspaces.length === 0 && (
                    <div className='text-muted'>Henüz çalışma alanı yok.</div>
                  )}
                  {workspaces.map((ws, i) => (
                    <div key={i} className='mb-4'>
                      <h3 className='fs-4 fw-bold mb-3'>{ws.name}</h3>
                      <div className='row g-3'>
                        {ws.boards.length === 0 && (
                          <div className='col-12 text-muted'>
                            Henüz pano yok.
                          </div>
                        )}
                        {ws.boards.map((b, j) => (
                          <div
                            key={j}
                            className='col-12 col-md-6 col-lg-4 col-xl-3'
                          >
                            <div className='card-container h-100 d-flex flex-column'>
                              <h3 className='fw-bold'>{b.name}</h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {mainView.type === 'workspaceBoards' && mainView.workspace && (
                <div>
                  <div className='d-flex align-items-center gap-3 mb-4'>
                    <span
                      className='d-flex align-items-center justify-content-center bg-primary text-white rounded-circle'
                      style={{
                        width: 48,
                        height: 48,
                        fontSize: 24,
                        fontWeight: 'bold'
                      }}
                    >
                      {getCurrentWorkspace(mainView.workspace).name[0]}
                    </span>
                    <div>
                      <h1 className='fs-3 fw-bold m-0'>
                        {getCurrentWorkspace(mainView.workspace).name}
                      </h1>
                      <div className='d-flex align-items-center gap-1 text-muted'>
                        <Lock size={14} />
                        <small>Özel</small>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='d-flex align-items-center gap-2 mb-3'>
                      <Users size={18} />
                      <h2 className='fs-4 fw-bold m-0'>Panolar</h2>
                      <button
                        className='primary-button ms-auto'
                        onClick={() => setShowBoardModal(true)}
                      >
                        <Plus size={18} className='me-1' />
                        Pano Oluştur
                      </button>
                    </div>
                    <div className='row g-3'>
                      {getCurrentWorkspace(mainView.workspace).boards.length ===
                        0 && (
                        <div className='col-12 text-muted'>Henüz pano yok.</div>
                      )}
                      {getCurrentWorkspace(mainView.workspace).boards.map(
                        (b, i) => (
                          <div
                            key={i}
                            className='col-12 col-md-6 col-lg-4 col-xl-3'
                          >
                            <div className='card-container h-100 d-flex flex-column'>
                              <h3 className='fw-bold'>{b.name}</h3>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
              {mainView.type === 'workspaceMembers' && mainView.workspace && (
                <div>
                  <div className='d-flex align-items-center gap-3 mb-4'>
                    <span
                      className='d-flex align-items-center justify-content-center bg-primary text-white rounded-circle'
                      style={{
                        width: 48,
                        height: 48,
                        fontSize: 24,
                        fontWeight: 'bold'
                      }}
                    >
                      {getCurrentWorkspace(mainView.workspace).name[0]}
                    </span>
                    <div>
                      <h1 className='fs-3 fw-bold m-0'>
                        {getCurrentWorkspace(mainView.workspace).name}
                      </h1>
                      <div className='d-flex align-items-center gap-2 text-muted'>
                        <Users size={14} />
                        <small>Üyeler</small>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className='fs-4 fw-bold mb-3'>Üyeler</h2>
                    {(!getCurrentWorkspace(mainView.workspace).members ||
                      getCurrentWorkspace(mainView.workspace).members.length ===
                        0) && <div className='text-muted'>Henüz üye yok.</div>}
                    <ul className='list-unstyled p-0'>
                      {getCurrentWorkspace(mainView.workspace).members &&
                        getCurrentWorkspace(mainView.workspace).members.map(
                          (m, i) => (
                            <li
                              key={i}
                              className='card-container mb-2 p-3 fw-bold'
                            >
                              {m.name}
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Çalışma Alanı Oluştur Modalı */}
        {showWorkspaceModal && (
          <div
            className='modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center'
            style={{ zIndex: 1050 }}
          >
            <div className='modal-dialog' style={{ maxWidth: 400 }}>
              <div className='modal-content card-container border-0'>
                <div className='modal-header border-0'>
                  <h5 className='modal-title'>Çalışma Alanı Oluştur</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setShowWorkspaceModal(false)}
                  ></button>
                </div>
                <div className='modal-body'>
                  <input
                    className='form-control styled-input mb-3'
                    placeholder='Çalışma alanı adı'
                    value={newWorkspaceName}
                    onChange={e => setNewWorkspaceName(e.target.value)}
                  />
                </div>
                <div className='modal-footer border-0'>
                  <button
                    className='btn btn-secondary'
                    onClick={() => setShowWorkspaceModal(false)}
                  >
                    İptal
                  </button>
                  <button
                    className='btn primary-button'
                    onClick={handleAddWorkspace}
                  >
                    Oluştur
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pano Oluştur Modalı */}
        {showBoardModal && (
          <div
            className='modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center'
            style={{ zIndex: 1050 }}
          >
            <div className='modal-dialog' style={{ maxWidth: 400 }}>
              <div className='modal-content card-container border-0'>
                <div className='modal-header border-0'>
                  <h5 className='modal-title'>Pano Oluştur</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setShowBoardModal(false)}
                  ></button>
                </div>
                <div className='modal-body'>
                  <input
                    className='form-control styled-input mb-3'
                    placeholder='Pano adı'
                    value={newBoardName}
                    onChange={e => setNewBoardName(e.target.value)}
                  />
                </div>
                <div className='modal-footer border-0'>
                  <button
                    className='btn btn-secondary'
                    onClick={() => setShowBoardModal(false)}
                  >
                    İptal
                  </button>
                  <button
                    className='btn primary-button'
                    onClick={handleAddBoard}
                  >
                    Oluştur
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Davet Modalı */}
        {showInviteModal && (
          <div
            className='modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center'
            style={{ zIndex: 1050 }}
          >
            <div className='modal-dialog' style={{ maxWidth: 400 }}>
              <div className='modal-content card-container border-0'>
                <div className='modal-header border-0'>
                  <h5 className='modal-title'>Çalışma Alanına Davet Et</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => {
                      setShowInviteModal(false)
                      setInviteEmail('')
                      setEmailError('')
                    }}
                  ></button>
                </div>
                <div className='modal-body'>
                  <input
                    className='form-control styled-input mb-3'
                    type='email'
                    placeholder='E-posta adresi'
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                  />
                  {emailError && (
                    <div className='text-danger mb-2'>{emailError}</div>
                  )}
                </div>
                <div className='modal-footer border-0'>
                  <button
                    className='btn primary-button w-100'
                    onClick={handleSendInvite}
                  >
                    📧 Mail Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
