import { setCookie } from 'nookies';

export function mySetCookie(name: string, value: any) {
  setCookie(undefined, name, value, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}
