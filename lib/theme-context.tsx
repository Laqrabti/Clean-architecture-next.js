// app/contexts/theme-context.tsx
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme }: { 
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme || 'light');
  
  // Function to set cookie (runs on client)
  const setCookie = (theme: Theme) => {
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
  };
  
  useEffect(() => {
    const root = document.documentElement;
    
    // Clean previous theme classes
    root.classList.remove('light', 'dark');
    // Add current theme
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // ✅ ALSO SAVE TO COOKIE for server-side reading
    setCookie(theme);
    
    // For CSS variables
    root.setAttribute('data-theme', theme);
    
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}