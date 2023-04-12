import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from '../../types';
import { TOUCHSTREAM_API_URL, TOUCHSTREAM_API_URL_AUTH } from '../constants';
import { asyncLocalStorage } from '../utils';

export default function useAuth() {
  const router = useRouter();

  const [auth, setAuth] = useState<User | null>(null);

  useEffect(() => {
    asyncLocalStorage.getItem('user').then((user: any) => {
      if (user) {
        setAuth(JSON.parse(user));
      } else {
        setAuth(null);
      }
    });
  }, []);

  async function login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${TOUCHSTREAM_API_URL_AUTH}/auth/login/`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.access) {
        Cookies.set('user', JSON.stringify(data));
        setAuth(data);
        router.push('/admin');
      } else {
        setAuth(null);
      }
      return data;
    } catch (err:any) {
      console.log(err);
      throw err;
    }
  }

  function logout(): void {
    Cookies.remove('user');
    setAuth(null);
  }

  return {
    auth,
    logout,
    login,
  };
}
