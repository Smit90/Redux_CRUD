import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const [themeDetails] = useState({
    light: { syntax: "#555", bg: "#eee", ui: "#ddd" },
    dark: { sytax: "#ddd", bg: "#555", ui: "#333" },
  });
  const [isLightTheme, setIsLightTheme] =useState(true)

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme)
  };

  return (
    <ThemeContext.Provider value={{ themeDetails,isLightTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
