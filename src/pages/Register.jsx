import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/LoginForm.css";
import { register as registerService } from '../services/auth';

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.username) newErrors.username = "Kullanıcı adı zorunlu";
    if (!form.name) newErrors.name = "İsim zorunlu";
    if (!form.surname) newErrors.surname = "Soyisim zorunlu";
    if (!form.email) newErrors.email = "Email zorunlu";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Geçerli bir email girin";
    if (!form.password) newErrors.password = "Şifre zorunlu";
    else if (form.password.length < 8) newErrors.password = "Şifre en az 8 karakter olmalı";
    else if (!/[A-Z]/.test(form.password)) newErrors.password = "Şifre en az 1 büyük harf içermeli";
    else if (!/[0-9]/.test(form.password)) newErrors.password = "Şifre en az 1 sayı içermeli";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // API'ye gönderilecek veri
        const userData = {
          name: form.name,
          surname: form.surname,
          email: form.email,
          password: form.password,
          memberName: form.username
        };
        await registerService(userData);
        alert('Kayıt başarılı!');
        window.location.href = '/login';
      } catch (error) {
        alert(error.response?.data?.message || 'Kayıt başarısız!');
      }
    }
  };

  const passwordConditions = [
    {
      label: "En az 8 karakter",
      valid: form.password.length >= 8,
    },
    {
      label: "En az 1 büyük harf",
      valid: /[A-Z]/.test(form.password),
    },
    {
      label: "En az 1 sayı",
      valid: /[0-9]/.test(form.password),
    },
  ];

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{minHeight: "100vh"}}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="login-container">
              <h2 className="login-title">KAYIT OL</h2>
              <form onSubmit={handleSubmit} className="login-form w-100">
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    placeholder="Kullanıcı Adı"
                    value={form.username}
                    onChange={handleChange}
                    className="login-input"
                  />
                  {errors.username && <div className="text-danger small mt-1">{errors.username}</div>}
                </div>
                
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="İsim"
                    value={form.name}
                    onChange={handleChange}
                    className="login-input"
                  />
                  {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                </div>
                
                <div className="mb-3">
                  <input
                    type="text"
                    name="surname"
                    placeholder="Soyisim"
                    value={form.surname}
                    onChange={handleChange}
                    className="login-input"
                  />
                  {errors.surname && <div className="text-danger small mt-1">{errors.surname}</div>}
                </div>
                
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Adresi"
                    value={form.email}
                    onChange={handleChange}
                    className="login-input"
                  />
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>
                
                <div className="mb-3" style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Şifre"
                    value={form.password}
                    onChange={handleChange}
                    className="login-input"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#888',
                      fontSize: 20
                    }}
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  >
                    {showPassword ? '🙉' : '🙈'}
                  </span>
                  {/* Şifre şartları ve hata mesajı aşağıda */}
                  <ul className="list-unstyled small mt-2">
                    {passwordConditions.map((cond, idx) => (
                      <li key={idx} className={`d-flex align-items-center mb-1 ${cond.valid ? 'text-info' : 'text-danger'}`}>
                        <span className="me-1 fw-bold">
                          {cond.valid ? "✓" : "✗"}
                        </span>
                        {cond.label}
                      </li>
                    ))}
                  </ul>
                  {errors.password && <div className="text-danger small">{errors.password}</div>}
                </div>
                
                <button
                  type="submit"
                  className="login-btn"
                >
                  KAYIT OL
                </button>
              </form>
              <div className="login-links mt-3">
                <span className="text-light">Zaten hesabınız var mı?</span>
                <Link to="/login" className="login-link ms-2">Giriş Yap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

