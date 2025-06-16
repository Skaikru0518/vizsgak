import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { axiosInstance } from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { toast } from 'sonner';

const Register = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: username,
        password: password,
        email: email,
      };
      const response = await axiosInstance.post(API_PATH.register, payload);
      //console.log(response.data);
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.error('Error registering');
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
            placeholder="email"
            type="email"
            className="p-4"
            onChange={(e) => setEmail(e.target.value)}
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

export default Register;
