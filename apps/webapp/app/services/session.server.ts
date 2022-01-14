import { createCookieSessionStorage, Session } from 'remix';

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [String(process.env.SESSION_PWD)],
    secure: process.env.NODE_ENV === 'production',
  },
});

console.log(`STORAGE SECRET: ${String(process.env.SESSION_PWD)}`);

export function getSession(request: Request): Promise<Session> {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

export let { commitSession, destroySession } = sessionStorage;