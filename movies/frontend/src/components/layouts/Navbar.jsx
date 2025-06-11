import React from 'react';
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
import { isLoggedIn } from '@/utils/isLoggedIn';

const Navbar = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="container">
        <Menubar>
          {isLoggedIn() ? (
            <div>Logged In!</div>
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
