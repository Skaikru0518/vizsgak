import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axiosInstance.post(API_PATH.register, payload);
      console.log(response.data);
      toast.success('Registered succesfully');
      navigate('/');
    } catch (error) {
      toast.error('Error in register process');
      console.error('Register error:', error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      <div className="container max-h-screen h-[calc(100vh-80px)]">
        <div className="flex mx-auto my-auto h-[100%] items-center justify-center">
          <form
            onSubmit={handleRegister}
            className="w-sm flex flex-col bg-slate-50 shadow-lg min-h-[250px] rounded-lg p-8 space-y-3"
          >
            <h1 className="text-lg font-semibold">
              Register to Movies Database
            </h1>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="username"
              className="p-4"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label htmlFor="username">Email</Label>
            <Input
              type="text"
              placeholder="email"
              className="p-4"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
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
            <Button type="submit" className="bg-emerald-500/90 text-white">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
