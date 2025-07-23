/* NotAuthorized.jsx  */
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './App.css'; // stil dosyası eklenecek

const NotAuthorized = () => {
  const { user } = useAuth(); // veya context yapınıza göre alın
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      setShowModal(true);
    }
  }, [user]);

  const closeModal = () => {
    setShowModal(false);
    // İsteğe bağlı: başka sayfaya yönlendirme yapılabilir
    // window.location.href = "/"; 
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Yetkisiz Giriş</h2>
            <p>Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
            <button onClick={closeModal}>Tamam</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotAuthorized;