import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { mySetCookie } from './utils/setCookie';
import { signOut } from './utils/signOut';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [] as any[];

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`,
  },
});

api.interceptors.response.use(
  (success) => {
    return success;
  },
  (error) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies();

        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post('/refresh', {
              refreshToken,
            })
            .then((response) => {
              const { token } = response.data;

              mySetCookie('nextauth.token', token);
              mySetCookie('nextauth.refreshToken', response.data.refreshToken);

              (api.defaults.headers as any)[
                'Authorization'
              ] = `Bearer ${token}`;

              failedRequestQueue.forEach((request) => request.onSuccess(token));
              failedRequestQueue = [];
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFailure(err));
              failedRequestQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;
              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        signOut();
      }
    }
    return Promise.reject(error);
  }
);
