import { useAuth } from '@/context/authContext';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    toast.success('Logout successful');
    navigate('/login');
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      <Loader className="animate-spin " />
    </div>
  );
}

export default Logout;
