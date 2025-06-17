import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import { Toaster } from 'sonner';
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Navbar from './components/layouts/Navbar';
import Games from './components/Pages/Games';
import Logout from './components/layouts/Logout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/games" element={<Games />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
      <Toaster richColors="true" closeButton="true" />
    </AuthProvider>
  );
};

export default App;

const Root = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Dashboard /> : <Login />;
};
