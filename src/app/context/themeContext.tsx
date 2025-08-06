'use client';
import { createContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load theme from localStorage on component mount
    try {
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'true');
      } else {
        // Default to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      // Fallback to light mode if localStorage fails
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      try {
        localStorage.setItem('darkMode', newMode.toString());
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
      return newMode;
    });
  }

  useEffect(() => {
    if (isClient) {
      try {
        if (isDarkMode) {
          document.body.classList.add('dark');
          document.documentElement.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.warn('Failed to update theme classes:', error);
      }
    }
  }, [isDarkMode, isClient]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}