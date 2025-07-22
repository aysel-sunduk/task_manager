import React, { createContext, useState, useMemo } from "react";
import "./App.css";

export const ThemeContext = createContext();

const darkTheme = {
  background: "#18191A",
  color: "#E4E6EB",
};

function App() {
  const [theme, setTheme] = useState("dark");
  const themeStyles = useMemo(() => (theme === "dark" ? darkTheme : {}), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ minHeight: "100vh", ...themeStyles }}>
        <h1>Task Manager</h1>
        <p>Welcome to your workspace!</p>
        {/* Routes and main layout will be here */}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
