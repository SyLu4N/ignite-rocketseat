import { setCookie } from 'nookies';

export function mySetCookie(local: any = undefined, name: string, value: any) {
  setCookie(local, name, value, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}
