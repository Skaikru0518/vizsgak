import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken'),
  );
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || '',
  );
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
      setUserName(localStorage.getItem('userName') || '');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (token, username) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', username);
    setIsLoggedIn(true);
    setUserName(username);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    setToken('');
  };

  const value = { isLoggedIn, userName, login, logout, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
