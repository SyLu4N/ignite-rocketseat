import { createContext, ReactNode, useEffect, useState } from 'react';

import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

import { api } from '../services/apiCliente';
import { mySetCookie } from '../services/utils/setCookie';

type User = {
  email?: string;
  permissions?: string[];
  roles?: string[];
};

type AuthContextData = {
  signIn: (credentials: ContextCredentials) => Promise<void>;
  signOut: () => void;
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

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;

        default:
          break;
      }
    };
  }, []);

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

      mySetCookie(undefined, 'nextauth.token', token);
      mySetCookie(undefined, 'nextauth.refreshToken', refreshToken);

      setUser({ email, permissions, roles });

      (api.defaults.headers as any)['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
