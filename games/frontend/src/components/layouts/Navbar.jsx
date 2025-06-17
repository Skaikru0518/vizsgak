import { useAuth } from '@/context/authContext';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="w-full flex items-center justify-center">
      <div className="container bg-slate-500/90 shadow-2xl rounded-2xl mt-2 flex flex-row justify-between p-3 font-semibold text-gray-100">
        <div>
          <Link to={'/'} className="text-3xl font-semibold italic">
            GameDB
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center space-x-3 text-lg">
          <Link to={'/'}>Home</Link>
          {isLoggedIn ? (
            <div className="flex flex-row space-x-3">
              <Link to={'/games'}>My games</Link>
              <Link to={'/logout'}>Logout</Link>
            </div>
          ) : (
            <div className="flex flex-row space-x-3">
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
