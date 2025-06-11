import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { username: username, password: password };
    try {
      const response = await axiosInstance.post(API_PATH.login, payload);
      if (response.status === 200) {
        toast.success('Logged in succesfully');
        login(
          response.data.token,
          response.data.userId,
          response.data.username,
        );
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Login error:', error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      <div className="container max-h-screen h-[calc(100vh-80px)]">
        <div className="flex mx-auto my-auto h-[100%] items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="w-sm flex flex-col bg-slate-50 shadow-lg min-h-[250px] rounded-lg p-8 space-y-3"
          >
            <h1 className="text-lg font-semibold">Login to Movies Database</h1>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="username"
              className="p-4"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="password"
              className="p-4"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-emerald-500/90 hover:bg-emerald-200 hover:transition duration-300 hover:cursor-pointer hover:text-black"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
