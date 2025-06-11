import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken'),
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage); // Fontos a cleanup!
  }, []);

  const login = (token, userId, userName) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
    setIsLoggedIn(true); // Frissítsd az állapotot login után
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false); // Frissítsd az állapotot logout után
  };

  const value = { isLoggedIn, login, logout }; // Objektum a context értékekhez

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
