import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <Link to="/" style={styles.link}>Ana Sayfaya Dön</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "4rem",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    fontSize: "6rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  link: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#007bff",
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    fontSize: "1rem",
  },
};

export default NotFound;
