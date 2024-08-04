import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    document.cookie = 'token=; Max-Age=0; path=/';
    router.push('/login');
  };

  return logout;
}
