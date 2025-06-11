import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/pages/Dashboard';
import Login from './components/layouts/Login';
import { isLoggedIn } from './utils/isLoggedIn';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
  );
};

export default App;

const Root = () => {
  return isLoggedIn() ? <Dashboard /> : <Login />;
};
