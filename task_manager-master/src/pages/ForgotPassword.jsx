import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/LoginForm.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: mail, 2: kod, 3: yeni şifre
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simülasyon için kod üret
  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Geçerli bir e-posta girin");
      return;
    }
    const code = generateCode();
    setSentCode(code);
    setStep(2);
    setError("");
    setSuccess("Doğrulama kodu e-posta adresinize gönderildi! (Simülasyon: " + code + ")");
  };

  const handleCheckCode = (e) => {
    e.preventDefault();
    if (code !== sentCode) {
      setError("Kod yanlış!");
      return;
    }
    setStep(3);
    setError("");
    setSuccess("");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setError("Şifre en az 8 karakter olmalı");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError("Şifre en az 1 büyük harf içermeli");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError("Şifre en az 1 sayı içermeli");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    setError("");
    setSuccess("Şifreniz başarıyla güncellendi!");
    // Burada API'ye yeni şifre gönderilebilir
  };

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-4">
            <div className="login-container">
              <h2 className="login-title">ŞİFREMİ UNUTTUM</h2>
              
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && <div className="alert alert-info py-2">{success}</div>}
              
              {step === 1 && (
                <form onSubmit={handleSendMail} className="login-form w-100">
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="login-input"
                      placeholder="E-posta Adresiniz"
                    />
                  </div>
                  <button type="submit" className="login-btn">
                    KODU GÖNDER
                  </button>
                </form>
              )}
              
              {step === 2 && (
                <form onSubmit={handleCheckCode} className="login-form w-100">
                  <div className="mb-3">
                    <input
                      type="text"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="login-input"
                      placeholder="Doğrulama Kodu"
                    />
                  </div>
                  <button type="submit" className="login-btn">
                    KODU DOĞRULA
                  </button>
                </form>
              )}
              
              {step === 3 && (
                <form onSubmit={handleResetPassword} className="login-form w-100">
                  <div className="mb-3">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="login-input"
                      placeholder="Yeni Şifre"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="login-input"
                      placeholder="Yeni Şifre (Tekrar)"
                    />
                  </div>
                  <button type="submit" className="login-btn">
                    ŞİFREYİ GÜNCELLE
                  </button>
                </form>
              )}
              
              <div className="login-links mt-3">
                <Link to="/login" className="login-link">Giriş Sayfasına Dön</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 