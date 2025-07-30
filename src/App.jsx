import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import {config} from "./config";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const ThemeContext = createContext();

const darkTheme = {
  background: "#18191A",
  color: "#E4E6EB",
};
const lightTheme = {
  background: "#f4f6fa",
  color: "#23272f",
};

function App() {
  const [theme, setTheme] = useState("dark");
  const themeStyles = useMemo(() => (theme === "dark" ? darkTheme : lightTheme), [theme]);

  // Body arka planını da güncelle
  useEffect(() => {
    document.body.style.background = themeStyles.background;
    document.body.style.color = themeStyles.color;
  }, [themeStyles]);

  return (
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
      <Router>
        <AuthProvider>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={theme === "dark" ? "theme-dark" : "theme-light"} style={{ minHeight: "100vh", ...themeStyles }}>
              <AppRoutes />
            </div>
          </ThemeContext.Provider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
