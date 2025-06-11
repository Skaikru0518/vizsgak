import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = () => {
      logout();
      toast.success('Logout successful');
      navigate('/');
    };
    handleLogout();
  }, [navigate, logout]);
  return (
    <div className="flex items-center justify-center flex-col h-[calc(100vh-80px)]">
      <Loader2 className="animate-spin size-48" />
    </div>
  );
};

export default Logout;
