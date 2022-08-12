import { createContext, ReactNode, useEffect, useState } from 'react';

import Router from 'next/router';
import { parseCookies } from 'nookies';

import { api } from '../services/api';
import { mySetCookie } from '../services/utils/setCookie';
import { signOut } from '../services/utils/signOut';

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

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
          window.alert('Deu ruim');
        });
    }
  }, []);

  async function signIn({ email, password }: ContextCredentials) {
    try {
      const response = await api.post('sessions', { email, password });
      const { permissions, roles, token, refreshToken } = response.data;

      mySetCookie('nextauth.token', token);
      mySetCookie('nextauth.refreshToken', refreshToken);

      setUser({ email, permissions, roles });

      (api.defaults.headers as any)['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
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
