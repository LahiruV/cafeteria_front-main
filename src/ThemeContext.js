import React, { createContext, useState, useEffect } from 'react';
import { themes } from './theme';

export const ThemeContext = createContext({
  themeIndex: 0,
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('themeIndex');
    if (saved !== null) {
      setThemeIndex(parseInt(saved, 10));
    }
  }, []);

  const toggleTheme = () => {
    setThemeIndex((prev) => {
      const next = (prev + 1) % themes.length;
      localStorage.setItem('themeIndex', next.toString());
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeIndex, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
