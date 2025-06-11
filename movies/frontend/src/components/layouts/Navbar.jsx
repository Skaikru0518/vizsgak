import React, { useEffect, useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '../ui/menubar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);
  return (
    <div className="flex justify-center w-full">
      <div className="container">
        <Menubar className="p-6 mt-3 flex justify-end flex-row">
          {isLoggedIn ? (
            <>
              <MenubarMenu>
                <Link to={'/'}>
                  <MenubarTrigger>Home</MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link to={'/favourites'}>
                  <MenubarTrigger>Favourites</MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link to={'/logout'}>
                  <MenubarTrigger>Logout</MenubarTrigger>
                </Link>
              </MenubarMenu>
            </>
          ) : (
            <>
              <MenubarMenu>
                <Link to={'/'}>
                  <MenubarTrigger>Home</MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link to={'/login'}>
                  <MenubarTrigger>Login</MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link to={'/register'}>
                  <MenubarTrigger>Register</MenubarTrigger>
                </Link>
              </MenubarMenu>
            </>
          )}
        </Menubar>
      </div>
    </div>
  );
};

export default Navbar;
