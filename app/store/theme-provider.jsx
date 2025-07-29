'use client'
import { useEffect, useState } from 'react';
import { ThemeContext } from '@/store/theme-context';

export default function ThemeProvider({ children }) {
  const [themeCode, setThemeCode] = useState('');

  useEffect(() => {
    if (themeCode) {
      document.documentElement.setAttribute('theme', themeCode);
      document.getElementById('__next')?.setAttribute('theme', themeCode);
    }
  }, [themeCode]);

  return (
    <ThemeContext.Provider value={{ themeCode, setThemeCode }}>
      {children}
    </ThemeContext.Provider>
  );
}