import React from 'react';
import { Menubar, MenubarMenu, MenubarTrigger } from '../ui/menubar';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const username = localStorage.getItem('userName');

  return (
    <div className="flex justify-center w-full">
      <div className="container">
        <Menubar className="p-6 my-3 flex justify-between flex-row">
          <div className="font-semibold">Joe's Movie Database</div>
          <div className="flex flex-row">
            {isLoggedIn ? (
              <div className="flex flex-row items-center">
                <div className="text-sm font-semibold mx-5">
                  Welcome back, {username}!
                </div>
                <MenubarMenu>
                  <Link to={'/'}>
                    <MenubarTrigger className="hover:bg-emerald-200 hover:transition duration-300 hover:cursor-pointer">
                      Home
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
                <MenubarMenu>
                  <Link to={'/favourites'}>
                    <MenubarTrigger className="hover:bg-emerald-200 hover:transition duration-300 hover:cursor-pointer">
                      Favourites
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
                <MenubarMenu>
                  <Link to={'/logout'}>
                    <MenubarTrigger className="hover:bg-emerald-200 hover:transition duration-300 hover:cursor-pointer">
                      Logout
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              </div>
            ) : (
              <>
                <MenubarMenu>
                  <Link to={'/'}>
                    <MenubarTrigger className="hover:bg-emerald-200 hover:transition duration-300 hover:cursor-pointer">
                      Home
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
                <MenubarMenu>
                  <Link to={'/login'}>
                    <MenubarTrigger className="hover:bg-emerald-200 hover:transition duration-300 hover:cursor-pointer">
                      Login
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
                <MenubarMenu>
                  <Link to={'/register'}>
                    <MenubarTrigger className="hover:bg-emerald-200 hover:transition duration-300 hover:cursor-pointer">
                      Register
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              </>
            )}
          </div>
        </Menubar>
      </div>
    </div>
  );
};

export default Navbar;
