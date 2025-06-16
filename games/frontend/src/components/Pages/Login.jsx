import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { axiosInstance } from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { toast } from 'sonner';
import { useAuth } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: username,
        password: password,
      };
      console.log(payload);
      const response = await axiosInstance.post(API_PATH.login, payload);
      console.log(response.data);
      toast.success('done');
      navigate('/dashboard');
      login(response.data.token, response.data.username);
    } catch (error) {
      console.error(error);
      toast.error('No');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="container flex justify-center">
        <form
          onSubmit={loginUser}
          className="w-md space-y-4 bg-gray-100/10 min-h-[250px] items-center justify-center flex-col flex p-4 rounded shadow-lg shadow-black/30"
        >
          <h1 className="text-lg font-semibold">Login to GameDB</h1>
          <Input
            placeholder="username"
            type="text"
            className="p-4"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            className="p-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
