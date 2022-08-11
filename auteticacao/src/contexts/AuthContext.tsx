import { createContext, ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';

import { api } from '../services/api';

type User = {
  email?: string;
  permissions?: string[];
  roles?: string[];
};

type AuthContextData = {
  signIn(credentials: ContextCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | undefined;
};

type ContextCredentials = {
  email: string;
  password: string;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api.get('/me').then((response) => {
        const { email, permissions, roles } = response.data;

        setUser({ email, permissions, roles });
      });
    }
  });

  async function signIn({ email, password }: ContextCredentials) {
    try {
      const response = await api.post('sessions', { email, password });
      const { permissions, roles, token, refreshToken } = response.data;

      setCookie(undefined, 'nextauth.token', token as string, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // acesso ao cookie '/' = global
      });
      setCookie(undefined, 'nextauth.refreshToken', refreshToken as string, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({ email, permissions, roles });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      router.push('/dashboard');
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
