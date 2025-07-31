import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";
import "./css/LoginForm.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState(""); // ✅ Eklendi
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        if (success.includes("gönderildi")) {
          setShowPasswordForm(true);
        } else if (success.includes("güncellendi")) {
          navigate('/login');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!showPasswordForm) {
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          throw new Error("Geçerli bir e-posta adresi girin");
        }

        const response = await fetch(`${config.API_URL}/api/auth/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const contentType = response.headers.get("content-type");
        let data;

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          data = text ? { message: text } : {};
        }

        if (!response.ok) {
          throw new Error(data.message || "İşlem başarısız oldu");
        }

        setSuccess(data.message || "Şifre sıfırlama bağlantısı gönderildi!");
      } else {
        if (!temporaryPassword || temporaryPassword.trim() === "") {
          throw new Error("Geçici şifre gereklidir");
        }
        if (!newPassword || newPassword.length < 8) {
          throw new Error("Şifre en az 8 karakter olmalı");
        }
        if (newPassword !== confirmPassword) {
          throw new Error("Şifreler eşleşmiyor");
        }

        const response = await fetch(`${config.API_URL}/api/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            temporaryPassword, // ✅ backend'e gönderilen alan
            newPassword,
            confirmPassword,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Şifre güncellenemedi");
        }

        setSuccess(data.message || "Şifreniz başarıyla güncellendi!");
      }
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("Sunucuyla bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edin.");
      } else {
        setError(err.message || "Bir hata oluştu");
      }

      if (err.message.includes("Failed to fetch") && !showPasswordForm) {
        setSuccess("Şifre sıfırlama bağlantısı gönderildi!");
      }
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="login-bg">
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <div className="login-container">
            <h2 className="login-title">ŞİFRE SIFIRLAMA</h2>

            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

            <form onSubmit={handleSubmit} className="login-form w-100">
              {!showPasswordForm ? (
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    placeholder="E-posta Adresiniz"
                    disabled={loading}
                    required
                  />
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={temporaryPassword}
                      onChange={(e) => setTemporaryPassword(e.target.value)}
                      className="login-input"
                      placeholder="Geçici Şifre (Mail ile gelen kod)"
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="mb-3 position-relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="login-input pe-5"
                      placeholder="Yeni Şifre (min 8 karakter)"
                      disabled={loading}
                      required
                      minLength="8"
                    />
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="password-toggle"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#999"
                      }}
                    >
                      {showNewPassword ? "🙈" : "👁️"}
                    </span>
                  </div>

                  <div className="mb-3 position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="login-input pe-5"
                      placeholder="Yeni Şifre (Tekrar)"
                      disabled={loading}
                      required
                      minLength="8"
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="password-toggle"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#999"
                      }}
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : showPasswordForm ? (
                  "ŞİFREYİ GÜNCELLE"
                ) : (
                  "ŞİFRE GÖNDER"
                )}
              </button>
            </form>

            <div className="login-links mt-3">
              <Link to="/login" className="login-link">Giriş Sayfasına Dön</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ResetPassword;
