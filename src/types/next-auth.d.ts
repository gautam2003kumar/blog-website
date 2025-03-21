import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends Partial<{
    _id: string;
    isVerified: boolean;
    isAdmin: boolean;
    username: string;
  }> {}

  interface Session {
    user: User & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Partial<{
    _id: string;
    isVerified: boolean;
    isAdmin: boolean;
    username: string;
  }> {}
}
