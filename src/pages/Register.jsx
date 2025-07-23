import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/LoginForm.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Burada API'ye gönderilebilir
      console.log("Kayıt verileri:", form);
      alert("Kayıt başarılı! (Simülasyon)");
      window.location.href = "/login";
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
                
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Şifre"
                    value={form.password}
                    onChange={handleChange}
                    className="login-input"
                  />
                  
                  {/* Şifre şartları */}
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

