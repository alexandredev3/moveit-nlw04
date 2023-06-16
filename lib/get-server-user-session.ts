import { getServerSession } from "next-auth";

import nextauthInstance from '@/src/pages/api/auth/[...nextauth]';

type User = {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export async function getServerUserSession() {
  const session = await getServerSession<any, User>(nextauthInstance.authOptions);

  return session?.user;
}