import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const sessionOptions = {
  cookieName: 'nuruai_session',
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export interface SessionData {
  admin?: {
    id: number;
    username: string;
  };
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}
