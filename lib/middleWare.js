import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useAuthMiddleware = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/login');
      }
      else {
        setLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  return { loading, logout };
};

export default useAuthMiddleware;